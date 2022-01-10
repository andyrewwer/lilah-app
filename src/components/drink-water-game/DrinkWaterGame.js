import './DrinkWaterGame.css';
import React, { Component } from 'react'
import Bathroom from './bathroom/Bathroom'
import LilahStats from './bathroom/lilah-stats/LilahStats'
import LilahActions from './bathroom/lilah-actions/LilahActions'
const { GameService } = require('../../service/GameService.js')


export default class DrinkWaterGame extends Component {
// OPTIONS:
/* // TODO:
  1. EASY (just lila) and HARD (include brushing your teeth)
  2. Add a "set" water minigame
  3. Adding other minigames (like feeding lila)
    3a - then adding meta games like knowing which game is next
  4. purring
  5. GAME SERVICE instead of calling setSTate every time, each interval (0.1s) will call setState but otherwise
*/
/* Todo MODAL on success */


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
    this.gameService = new GameService(50, 50, 5, 10);
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
      <div className="container-drink-water-game">
        <div className="container-lilah-stats">
          <LilahStats loveCurrent={this.state.loveCurrent} attentionSeeked={this.state.attentionSeeked} thirstQuenched={this.state.thirstQuenched}/>
        </div>
        <div className="container-bathroom">
          <Bathroom gameService={this.gameService} lilahPos={this.state.lilahPos}/>
        </div>
        <div className="container-lilah-actions">
          <LilahActions petLilahCallback={this.petLilah} ignoreLilahCallback={this.ignoreLilah} talkToLilahCallback={this.talkToLilah}/>
        </div>
      </div>
    );
  }
}
