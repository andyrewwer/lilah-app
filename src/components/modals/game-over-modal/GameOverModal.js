import React, { Component } from 'react';
import './GameOverModal.css';
import Modal from 'react-modal';
import {customStyles, convertIntToTime} from '../../util/Styles.js'
import GameWonContent from './game-won-content/GameWonContent'
import GameLostContent from './game-lost-content/GameLostContent'
import {GAME_OVER_GAME_WON} from '../../../service/GameService'

// TODO prevent scroll behind modal
export default class GameOverModal extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const closeModal = () => {
      this.props.gameService.startNewGame(50, 50, 0, 10);
    }
    let timeRemaining = this.props.gameService.getState()['timeRemaining'];
    let highScore = this.props.gameService.getState()['highScore'];
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.gameOver}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          centered
          >
          {GAME_OVER_GAME_WON === this.props.gameStatus ?
             <GameWonContent timeRemaining={convertIntToTime(timeRemaining)} highScore={convertIntToTime(highScore)} closeModalCallback={closeModal}/> :
             <GameLostContent timeRemaining={convertIntToTime(timeRemaining)} highScore={convertIntToTime(highScore)} closeModalCallback={closeModal} status={this.props.gameStatus} thirstQuenched={this.props.gameService.getState()['thirstQuenched']}/>
        }
        </Modal>
      </React.Fragment>
    )
  }
}
