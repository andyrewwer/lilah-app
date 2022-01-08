import './Bathroom.css';
import React, { Component } from 'react'
import Lila from './lila/Lila'
import LilaMeta, {loveBar, attentionBar, thirstBar} from './lila-meta/LilaMeta'
const { GameService } = require('../../service/GameService.js')


export default class Bathroom extends Component {
// OPTIONS:
/*
  1. EASY (just lila) and HARD (include brushing your teeth)
  2. Add a "set" water minigame
  3. Adding other minigames (like feeding lila)
    3a - then adding meta games like knowing which game is next
  4. purring
  5. GAME SERVICE instead of calling setSTate every time, each interval (0.1s) will call setState but otherwise
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
    this.gameService = new GameService(50, 50, 5, 80);
    this.state = this.gameService.getState();

    this.petLila = this.petLila.bind(this);
    this.ignoreLila = this.ignoreLila.bind(this);
    this.talkToLila = this.talkToLila.bind(this);
  }

  petLila() {
    this.gameService.petLila()
  }

  ignoreLila() {
    this.gameService.ignoreLila()
  }

  talkToLila() {
    this.gameService.talkToLila()
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-lila">
          <Lila lilaPos={this.state.lilaPos} gameService={this.gameService} />
        </div>
        <div className="container-lila-meta">
          <LilaMeta  loveCurrent={this.state.loveCurrent} attentionSeeked={this.state.attentionSeeked} thirstQuenched={this.state.thirstQuenched}
                petLilaCallback={this.petLila} ignoreLilaCallback={this.ignoreLila} talkToLilaCallback={this.talkToLila}/>
        </div>
      </React.Fragment>
    );
  }
}
