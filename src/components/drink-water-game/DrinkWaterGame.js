import './DrinkWaterGame.css';
import React, { Component } from 'react'
import Bathroom from './bathroom/Bathroom'
import LilahStats from './bathroom/lilah-stats/LilahStats'
import PlayerStats from './bathroom/player-stats/PlayerStats'
import LilahActions from './bathroom/lilah-actions/LilahActions'
import PlayerMoveActions from './bathroom/player-actions/PlayerMoveActions'
import PlayerActions from './bathroom/player-actions/PlayerActions'
import GameOverModal from '../modals/game-over-modal/GameOverModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassStart, faHourglassEnd } from '@fortawesome/free-solid-svg-icons'
import { faHourglass } from '@fortawesome/free-regular-svg-icons'

const { GameService } = require('../../service/GameService.js')

export default class DrinkWaterGame extends Component {
// OPTIONS:
/* // TODO:
  1. EASY (just lila) and HARD (include brushing your teeth)
  2. Add a "set" water minigame
  3. Adding other minigames (like feeding lila)
    3a - then adding meta games like knowing which game is next
  4. purring
  5. game timer
  6. changelog?
  7. get domain and deploy there
  8. indication of when Lila is drinking and good stuff happening
  9. THIRST QUENCHEd BAR SHOULD BE MORE OBVIOUSLY "GREEN"
*/
  componentDidMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    this.interval = setInterval(() => {
      let newState = this.gameService.regularUpdate();
      console.log(newState.lock)
      if (this.state.alert !== 'none') {
        this.gameService.setAlert('none');
        // newState.alert = 'none';
      }
      if (this.state.lilahAnimation.slice(0,5) === 'drink') {
        this.resetAnimation();
      }
      this.setState(newState);
    }, 500);
  }

  _handleKeyDown (e) {
      if (e.keyCode === 37) {
        this.movePlayerLeft();
      } else if (e.keyCode === 39) {
        this.movePlayerRight();
      }
    }

  resetAnimation() {
    setTimeout(function() {
      this.gameService.setAnimation('none');
      this.setState(this.gameService.getState());
    }.bind(this), 50);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
    clearInterval(this.interval);
  }

  constructor() {
    super();
    this.gameService = new GameService(50, 0, 70, 80);
    this.state = this.gameService.getState();

    this.petLilah = this.petLilah.bind(this);
    this.ignoreLilah = this.ignoreLilah.bind(this);
    this.talkToLilah = this.talkToLilah.bind(this);
    this.movePlayerLeft = this.movePlayerLeft.bind(this);
    this.movePlayerRight = this.movePlayerRight.bind(this);
    this.toiletAction = this.toiletAction.bind(this);
    this.brushTeeth = this.brushTeeth.bind(this);
  }

  petLilah() {
    this.gameService.petLilah();
    this.setState(this.gameService.getState());
    this.resetAnimation();
  }

  ignoreLilah() {
    this.gameService.ignoreLilah()
  }

  talkToLilah() {
    this.gameService.talkToLilah()
    this.setState(this.gameService.getState());
    this.resetAnimation();
  }

  movePlayerLeft() {
    this.gameService.movePlayer(true);
  }

  movePlayerRight() {
    this.gameService.movePlayer(false);
  }

  brushTeeth() {
    this.gameService.brushTeeth();
    this.setState(this.gameService.getState());
    this.resetAnimation();
  }

  toiletAction(){
    this.gameService.toiletAction();
    this.setState(this.gameService.getState());
    this.resetAnimation();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-drink-water-game">
          <div className="container-drink-header">
            <div className="container-stats">
              <span style={{textAlign:"center"}, {fontFamily: "Courier New"}}> Lilah</span>
              <LilahStats loveCurrent={this.state.loveCurrent} thirstQuenched={this.state.thirstQuenched}/>
            </div>
            <div className="container-stats">
              <span style={{textAlign:"center"}, {fontFamily: "Courier New"}}> Maddy</span>
              <PlayerStats toiletCurrent={this.state.toiletCurrent} teethCurrent={this.state.teethCurrent}/>
            </div>
          </div>
          <div className="container-bathroom">
            <Bathroom gameService={this.gameService} lilahPos={this.state.lilahPos} playerPos={this.state.playerPos}/>
          </div>
          <div className="container-drink-footer">
            <div className="container-drink-footer-inner">
              <LilahActions petLilahCallback={this.petLilah} ignoreLilahCallback={this.ignoreLilah} talkToLilahCallback={this.talkToLilah}/>
              <PlayerActions brushTeethCallback={this.brushTeeth} toiletCallback={this.toiletAction} talkToLilahCallback={this.talkToLilah}/>
              <div className="grid-span-2">
                <PlayerMoveActions moveLeftCallback={this.movePlayerLeft} moveRightCallback={this.movePlayerRight}/>
              </div>
            </div>
          </div>
        </div>
        <GameOverModal gameService={this.gameService} gameOver={this.state.gameOver} gameStatus={this.state.gameStatus}/>
        {(this.state.alert === 'lilah-no-pet') && <div className="lilah-not-close-enough-alert">
          <h2> LILAH IS NOT CLOSE ENOUGH TO PET </h2>
        </div>}
        {(this.state.alert === 'player-not-at-sink') && <div className="lilah-not-close-enough-alert">
          <h2> YOU MUST BE IN FRONT OF THE SINK TO BRUSH YOUR TEETH </h2>
        </div>}
        {(this.state.alert === 'player-not-at-toilet') && <div className="lilah-not-close-enough-alert">
          <h2> YOU MUST BE IN FRONT OF THE TOILET TO RELIEVE YOURSELF </h2>
        </div>}
        {this.state.lock > 0 &&
          <div className="circle">
            <div className="minutes"></div>
            <div className="circle-span"><FontAwesomeIcon icon={this.state.lock > 1 ? faHourglassStart : this.state.lock > 0.5 ? faHourglass : faHourglassEnd} />
          </div>
        </div>}
      </React.Fragment>
    );
  }
}
