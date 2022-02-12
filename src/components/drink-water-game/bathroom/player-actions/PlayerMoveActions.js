import './PlayerMoveActions.css';
import React, { Component } from 'react'

export default class PlayerMoveActions extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="player-move-actions">
          <div className="move-left">
            <button className="player-move-button" onClick={this.props.moveLeftCallback}>Move Left</button>
          </div>
          <div className="move-right">
            <button className="player-move-button" onClick={this.props.moveRightCallback}>Move Right</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
