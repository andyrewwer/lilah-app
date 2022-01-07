import './Panel.css';
import React, { Component } from 'react'
import Lila from './lila/Lila'
import LilaMeta, {loveBar, attentionBar, thirstBar} from './lila-meta/LilaMeta'
const { GameService } = require('../../service/GameService.js')


export default class Panel extends Component {
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
    this.gameService = new GameService(50, 50, 5, 8);
    this.state = this.gameService.getState();

    this.petLila = this.petLila.bind(this);
    this.ignoreLila = this.ignoreLila.bind(this);
    this.talkToLila = this.talkToLila.bind(this);
    this.moveLila = this.moveLila.bind(this);
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

  moveLila(moveLeft) {
    if (moveLeft && this.state.lilaPos > 1) {
      this.setState({
        lilaPos: this.state.lilaPos - 1
      });
    } else if (!moveLeft && this.state.lilaPos < 10) {
      this.setState({
        lilaPos: this.state.lilaPos + 1
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-lila">
          <Lila lilaPos={this.state.lilaPos} moveLilaCallback={this.moveLila}/>
        </div>
        <div className="container-lila-meta">
          <LilaMeta  loveCurrent={this.state.loveCurrent} attentionSeeked={this.state.attentionSeeked} thirstQuenched={this.state.thirstQuenched}
                petLilaCallback={this.petLila} ignoreLilaCallback={this.ignoreLila} talkToLilaCallback={this.talkToLila}/>
        </div>
      </React.Fragment>
    );
  }
}
