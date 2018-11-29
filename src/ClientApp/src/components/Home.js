import React, { Component } from 'react';

export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <h1>Custom Vision Docker Frontend!</h1>
        <p>If you don't know what this is, check out:</p>
        <ul>
          <li><a href='https://github.com/xtellurian/Custom-Vision-Frontend'>The source code</a></li>
          <li><a href='https://customvision.ai'>The Custom Vision Service</a></li>
        </ul>
        <p>To get started, check out the <a href='/predict-image'>predict image</a> page</p>
      </div>
    );
  }
}
