
import React from 'react';
export class AlertRef {

  static instance = null;
  static createInstance() {
      var object = React.createRef();
      return object;
  }

  static getInstance () {
      if (!AlertRef.instance) {
          AlertRef.instance = AlertRef.createInstance();
      }
      return AlertRef.instance;
  }
}