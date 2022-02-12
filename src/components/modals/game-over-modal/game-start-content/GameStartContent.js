import React, { Component } from 'react';
import './GameStartContent.css';

const lilah = require('../../../../assets/lilah-300.png');

export default class GameStartContent extends Component {

  render () {
    return (
      <React.Fragment>
        <div className="game-start-container">
          <div className="title-one">
            <h2 className="game-start-title"> HAPPY BIRTHDAY MADDY </h2>
          </div>
          <div className="lilah-img">
            <img src={lilah} width={'150px'} height={'150px'} alt='lilah'/>
            <div className="circle-around-lilah-start-img"></div>
          </div>
          <div className="title-two">
            <h2 className="game-start-title"> Can you quench Lilah's thirst whilst getting ready for bed? </h2>
          </div>
          <div className="start-content">
            <span> To win this game you will need to:</span>
            <ul>
              <li> Brush your teeth </li>
              <li> Relieve yourself </li>
              <li> Try to make Lilah feel loved (enough to make her willing to drink water) </li>
              <li> Convince Lilah to   head to the sink and drink water </li>
            </ul>
          </div>
          <div className="start-game-button">
            <button className="start-game-button" onClick={this.props.closeModalCallback}> Start Game </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
