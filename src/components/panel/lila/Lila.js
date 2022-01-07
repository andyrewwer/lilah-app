import './Lila.css';
import React, { Component } from 'react'

export default class Lila extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <div className="lila-container">
          <div className="sink"></div>
          <div className="lila" style={{gridColumn: this.props.lilaPos}}>
          </div>
        </div>
        <a onClick={() => this.props.moveLilaCallback(true)}>Move Left</a>
        <a onClick={() => this.props.moveLilaCallback(false)}>Move Right</a>
      </React.Fragment>
    );
  }
}
