import React, { Component } from 'react';
import './GameLostContent.css';
import {GAME_OVER_OUT_OF_TIME, GAME_OVER_LOVE_TOO_LOW, GAME_OVER_TOILET_TOO_HIGH} from '../../../../service/GameService'
const lilah = require('../../../../assets/lilah-sad-300.png');

export default class GameLostContent extends Component {

  getMessage(status) {
    if (status === GAME_OVER_OUT_OF_TIME) {
      return 'You ran out of time'
    } else if (status === GAME_OVER_LOVE_TOO_LOW ) {
      return 'Lilah left the bathroom :('
    } else if (status === GAME_OVER_TOILET_TOO_HIGH) {
      return 'Your stomach is too upset'
    } else {
      return 'Game OVer'
    }
  }

  render () {

    return (
      <React.Fragment>
        <div className="game-lost-container">
          <div className="lilah-img">
            <img src={lilah} width={'150px'} height={'150px'} alt='lilah'/>
            <div className="circle-around-lilah-lost-img"></div>
          </div>
          <div className="title">
            <h2 className="game-lost-title">
            { this.getMessage(this.props.status)} </h2>
          </div>
          <div className="score-lost">
            <p className="score-lost"> Time Remaining: <span className="red"> {this.props.gameService.getTimeRemaining()} seconds </span></p>
            <p className="score-lost"> Thirst Quenched: <span className="red"> {this.props.gameService.getState()['thirstQuenched']}% </span></p>
            <p className="score-lost"> Teeth brushed: <span className="red"> {this.props.gameService.getState()['teethCurrent']}% </span></p>
            <p className="score-lost"> Toilet need relieved: <span className="red"> {this.props.gameService.getState()['toiletCurrent']}% </span></p>
          </div>
          <div className="score-lost-total">
            <span className="score-lost-total"> Total Score: <span className="red"> {this.props.gameService.calculateScore()} </span></span>
          </div>
          <div className="play-again-button">
            <button className="play-again-lost-button" onClick={this.props.closeModalCallback}> PLAY AGAIN</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
