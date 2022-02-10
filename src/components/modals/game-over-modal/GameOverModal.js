import React, { Component } from 'react';
import './GameOverModal.css';
import Modal from 'react-modal';
import {customStyles, convertIntToTime} from '../../util/Styles.js'
import GameWonContent from './game-won-content/GameWonContent'
import GameLostContent from './game-lost-content/GameLostContent'
import GameStartContent from './game-start-content/GameStartContent'
import {GAME_OVER_GAME_WON, GAME_NOT_STARTED} from '../../../service/GameService'

// TODO prevent scroll behind modal
export default class GameOverModal extends Component {

  render () {
    const closeModal = () => {
      this.props.gameService.startNewGame(50, 0, 10, 80);
    }
    let timeRemaining = this.props.gameService.getState()['timeRemaining'];
    let highScore = this.props.gameService.getState()['highScore'];
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.gameOver || GAME_NOT_STARTED === this.props.gameStatus}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          centered
          >
          {GAME_NOT_STARTED === this.props.gameStatus ?
            <GameStartContent closeModalCallback={closeModal}/> :
            GAME_OVER_GAME_WON === this.props.gameStatus ?
             <GameWonContent timeRemaining={convertIntToTime(timeRemaining)} highScore={convertIntToTime(highScore)} closeModalCallback={closeModal}/> :
             <GameLostContent timeRemaining={convertIntToTime(timeRemaining)} highScore={convertIntToTime(highScore)} closeModalCallback={closeModal} status={this.props.gameStatus} thirstQuenched={this.props.gameService.getState()['thirstQuenched']}/>
        }
        </Modal>
      </React.Fragment>
    )
  }
}
