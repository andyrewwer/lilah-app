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
          <div className="score-lost">
            <p className="score-lost"> Time Remaining: <span className="red"> {this.props.gameService.getTimeRemaining()} </span></p>
            <p className="score-lost"> Thirst Quenched: <span className="red"> {this.props.gameService.getState()['thirstQuenched']}% </span></p>
            <p className="score-lost"> Teeth brushed: <span className="red"> {this.props.gameService.getState()['teethCurrent']}% </span></p>
            <p className="score-lost"> Toilet need relieved: <span className="red"> {this.props.gameService.getState()['toiletCurrent']}% </span></p>
          </div>
          <div className="score-lost-total">
            <span className="score-lost-total"> Total Score: <span className="red"> {this.props.gameService.calculateScore()} </span></span>
          </div>
          <div className="play-again-button">
            <button className="play-again-won-button" onClick={this.props.closeModalCallback}> Play Again </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// <div className="high-score-won">
//   <span className="score-won"> High Score: <span className="green"> {this.props.highScore} remaining</span> </span>
// </div>
