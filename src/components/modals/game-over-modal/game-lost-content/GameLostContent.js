import React, { Component } from 'react';
import './GameLostContent.css';
import {GAME_OVER_OUT_OF_TIME, GAME_OVER_LOVE_TOO_LOW} from '../../../../service/GameService'
const lilah = require('../../../../assets/lilah-sad-300.png');

export default class GameLostContent extends Component {
  constructor(props) {
    super(props);
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
            { this.props.status === GAME_OVER_OUT_OF_TIME ? 'OUT OF TIME' : this.props.status === GAME_OVER_LOVE_TOO_LOW ? 'OUT OF LOVE' : 'GAME OVER'
            } </h2>
          </div>
          <div className="score-lost">
            <span className="score-lost"> Thirst Quenched: <span className="red"> {this.props.thirstQuenched}% </span></span>
          </div>
          <div className="high-score-lost">
            <span className="score-lost"> High Score: <span className="red"> {this.props.highScore} remaining</span> </span>
          </div>
          <div className="play-again-button">
            <button className="play-again-lost-button" onClick={this.props.closeModalCallback}> PLAY AGAIN</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
