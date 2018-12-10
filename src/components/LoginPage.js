import React, { Component } from 'react'
import AuthConsumer from '../services/Auth/AuthConsumer'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = login => {
    return event => {
      event.preventDefault();
      const { username, password } = this.state
      login(username, password);
    }
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } }
    return (
      <div className="Login">
        <AuthConsumer>
          {({ userInfo, login }) => {
            if (userInfo) return <Redirect to={from} />
            return (
              <form onSubmit={this.handleSubmit(login)}>
                <div>
                  <label>Username</label>
                  <input
                    id="username"
                    type="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <input
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </div>
                <button disabled={!this.validateForm()} type="submit">
                  Login
                </button>
              </form>
            );
          }}
        </AuthConsumer>
      </div>
    );
  }
}
