import React, { Component } from 'react';
import './GameWonContent.css';

const lilah = require('../../../../assets/lilah-300.png');

// TODO prevent scroll behind modal
export default class GameWonContent extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const closeModal = () => {
      this.props.gameService.startNewGame(50, 50, 5, 10, false);
    }
    return (
      <React.Fragment>
        <div className="game-won-container">
          <div className="lilah-img">
            <img src={lilah} width={'150px'} height={'150px'} alt='lilah'/>
            <div className="circle-around-lilah-img"></div>
          </div>
          <div className="title">
            <h2 className="game-won-title"> YOU WIN </h2>
          </div>
          <div className="score">
            <span className="score"> Score: <span className="green"> 1:24 remaining </span></span>
          </div>
          <div className="high-score">
            <span className="score"> High Score: <span className="green"> 1:22 remaining </span> </span>
          </div>
          <div className="play-again-button">
            <button className="play-again-button" onClick={this.props.closeModalCallback}> PLAY AGAIN </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
