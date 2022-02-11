import './PlayerActions.css';
import React, { Component } from 'react'

export default class PlayerActions extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="player-actions">
          <div className="move-left">
            <button className="player-button" onClick={this.props.moveLeftCallback}>MOVE LEFT</button>
          </div>
          <div className="move-right">
            <button className="player-button" onClick={this.props.moveRightCallback}>MOVE RIGHT</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
