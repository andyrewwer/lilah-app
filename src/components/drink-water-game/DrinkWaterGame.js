import './DrinkWaterGame.css';
import React, { Component } from 'react'
import Bathroom from './bathroom/Bathroom'
import LilahStats from './bathroom/lilah-stats/LilahStats'
import LilahActions from './bathroom/lilah-actions/LilahActions'
import GameWonModal from '../modals/game-over-modal/GameOverModal'
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
    this.interval = setInterval(() => {
      this.setState(this.gameService.regularUpdate());
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  constructor() {
    super();
    this.gameService = new GameService(50, 50, 0, 10, 40);
    this.state = this.gameService.getState();

    this.petLilah = this.petLilah.bind(this);
    this.ignoreLilah = this.ignoreLilah.bind(this);
    this.talkToLilah = this.talkToLilah.bind(this);
  }

  petLilah() {
    this.gameService.petLilah()
  }

  ignoreLilah() {
    this.gameService.ignoreLilah()
  }

  talkToLilah() {
    this.gameService.talkToLilah()
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-drink-water-game">
          <div className="container-lilah-stats">
            <LilahStats loveCurrent={this.state.loveCurrent} attentionSeeked={this.state.attentionSeeked} thirstQuenched={this.state.thirstQuenched}/>
          </div>
          <div className="container-lilah-title">
            <div className="drink-water-game-title">
              <h2> LILAH </h2>
            </div>
          </div>
          <div className="container-lilah-actions">
            <LilahActions petLilahCallback={this.petLilah} ignoreLilahCallback={this.ignoreLilah} talkToLilahCallback={this.talkToLilah}/>
          </div>
          <div className="container-lilah-filler"></div>
          <div className="container-bathroom">
            <Bathroom gameService={this.gameService} lilahPos={this.state.lilahPos} playerPos={this.state.playerPos}/>
          </div>
            <div className="container-player-filler"></div>
          <div className="container-player-stats">
            <LilahStats loveCurrent={this.state.loveCurrent} attentionSeeked={this.state.attentionSeeked} thirstQuenched={this.state.thirstQuenched}/>
          </div>
          <div className="container-player-title">
            <div className="drink-water-game-title">
              <h2> PLAYER </h2>
            </div>
          </div>
          <div className="container-player-actions">
            <LilahActions petLilahCallback={this.petLilah} ignoreLilahCallback={this.ignoreLilah} talkToLilahCallback={this.talkToLilah}/>
          </div>
        </div>
        <GameWonModal gameService={this.gameService} gameOver={this.state.gameOver} gameStatus={this.state.gameStatus}/>
      </React.Fragment>
    );
  }
}
