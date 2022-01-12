import React, { Component } from 'react';
import './GameWonContent.css';

const lilah = require('../../../../assets/lilah-300.png');

export default class GameWonContent extends Component {

  render () {
    return (
      <React.Fragment>
        <div className="game-won-container">
          <div className="lilah-img">
            <img src={lilah} width={'150px'} height={'150px'} alt='lilah'/>
            <div className="circle-around-lilah-won-img"></div>
          </div>
          <div className="title">
            <h2 className="game-won-title"> YOU WIN </h2>
          </div>
          <div className="score-won">
            <span className="score-won"> Score: <span className="green"> {this.props.timeRemaining} remaining</span></span>
          </div>
          <div className="high-score-won">
            <span className="score-won"> High Score: <span className="green"> {this.props.highScore} remaining</span> </span>
          </div>
          <div className="play-again-button">
            <button className="play-again-won-button" onClick={this.props.closeModalCallback}> PLAY AGAIN </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
