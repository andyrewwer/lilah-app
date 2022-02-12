import './PlayerActions.css';
import React, { Component } from 'react'

export default class PlayerActions extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="player-actions">
          <div className="brush-teeth">
            <button className="player-button" onClick={this.props.brushTeethCallback}>Brush Teeth</button>
          </div>
          <div className="toilet-button">
            <button className="player-button" onClick={this.props.toiletCallback}>Relieve Yourself</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
