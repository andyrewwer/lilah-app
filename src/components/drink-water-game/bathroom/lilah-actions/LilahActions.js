import './LilahActions.css';
import React, { Component } from 'react'

export default class LilahActions extends Component {

  render() {
    return (
        <div className="actions">
          <div className="pet">
            <button className="lilah-button" onClick={this.props.petLilahCallback}>Pet Lilah</button>
          </div>
          <div className="ignore">
            <button className="lilah-button" onClick={this.props.ignoreLilahCallback}>Ignore Lilah</button>
          </div>
          <div className="ignore">
            <button className="lilah-button" onClick={this.props.talkToLilahCallback}>Coax Lilah </button>
          </div>
        </div>
    );
  }
}
