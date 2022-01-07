import './LilaMeta.css';
import React, { Component } from 'react'
import StatusBar from '../../util/status-bar/StatusBar'

// TODO move to external configs
  export const loveBar =
  {
    max: 100,
    loseThreshold: 20,
    targetThreshold: 80,
    label: 'Love Felt'
  }

  export const attentionBar =
  {
    max: 100,
    loseThreshold: 40,
    targetPosition: 'middle',
    targetThreshold: 60,
    loseIsYellow: true,
    label: 'Attention seeking'
  }

  export const thirstBar =
  {
    max: 100,
    loseThreshold: 90,
    targetPosition: 'middle',
    targetThreshold: 90,
    loseIsYellow: true,
    label: 'Thirst Quenched'
  }


export default class LilaMeta extends Component {
  // TODO EVERY "TICK" love felt goes down etc


  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <StatusBar max={loveBar.max} current={this.props.loveCurrent} loseThreshold={loveBar.loseThreshold} targetThreshold={loveBar.targetThreshold} label={loveBar.label}/>
        <StatusBar max={attentionBar.max} current={this.props.attentionSeeked} loseThreshold={attentionBar.loseThreshold} targetThreshold={attentionBar.targetThreshold} label={attentionBar.label} targetPosition={attentionBar.targetPosition} loseIsYellow={attentionBar.loseIsYellow}/>
        <StatusBar max={thirstBar.max} current={this.props.thirstQuenched} loseThreshold={thirstBar.loseThreshold} targetThreshold={thirstBar.targetThreshold} label={thirstBar.label} />
        <div className="actions">
          <div className="pet">
            <button className="lila-button" onClick={this.props.petLilaCallback}>PET</button>
          </div>
          <div className="ignore">
            <button className="lila-button" onClick={this.props.ignoreLilaCallback}>IGNORE</button>
          </div>
          <div className="ignore">
            <button className="lila-button" onClick={this.props.talkToLilaCallback}>TALK</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
