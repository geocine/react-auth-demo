const fs = require('fs')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./database.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser)

const SECRET_KEY = '%lP6ZATIxHGl0LeL69W^#99PRS5dwl2Z'

const expiresIn = '1h'

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({username, password}){
  return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
}

function getUser({username, password}){
  return userdb.users.find(user => user.username === username && user.password === password);
}


server.post('/auth/login', (req, res) => {
  const {username, password} = req.body
  if (isAuthenticated({username, password}) === false) {
    const status = 401
    const message = 'Incorrect username or password'
    res.status(status).json({status, message})
    return
  }
  const accessToken = createToken({username, password})
  const userInfo = getUser({username, password});
  res.status(200).json({...userInfo, accessToken})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    // no token
    const status = 401
    const message = 'You are not authorized!'
    res.status(status).json({status, message})
    return
  }
  try {
     verifyToken(req.headers.authorization.split(' ')[1])
     next()
  } catch (err) {
    // token expired
    const status = 401
    const message = 'You are not authorized!'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(3001, () => {
  console.log('Run Auth API Server on :3001')
})