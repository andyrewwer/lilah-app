import React, { Component } from 'react';
import './GameOverModal.css';
import Modal from 'react-modal';
import {customStyles} from '../../util/Styles.js'
import GameWonContent from './game-won-content/GameWonContent'

// TODO prevent scroll behind modal
export default class GameOverModal extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const closeModal = () => {
      this.props.gameService.startNewGame(50, 50, 5, 10, false);
    }
    return (
      <React.Fragment>
        <Modal
          isOpen={this.props.gameOver}
          onRequestClose={closeModal}
          style={customStyles}
          ariaHideApp={false}
          centered
          >
          <GameWonContent gameWon={this.props.gameWon} closeModalCallback={closeModal}/>
        </Modal>
      </React.Fragment>
    )
  }
}
