import './LilahActions.css';
import React, { Component } from 'react'

export default class LilahActions extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="actions">
          <div className="pet">
            <button className="lilah-button" onClick={this.props.petLilahCallback}>PET</button>
          </div>
          <div className="ignore">
            <button className="lilah-button" onClick={this.props.ignoreLilahCallback}>IGNORE</button>
          </div>
          <div className="ignore">
            <button className="lilah-button" onClick={this.props.talkToLilahCallback}>COAX</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
