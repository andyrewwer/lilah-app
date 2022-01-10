import './LilahStats.css';
import React, { Component } from 'react'
import StatusBar from '../../../util/status-bar/StatusBar'

// TODO move to external configs
// TODO make this more generic to allow more bars and maybe colors
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
    loseThreshold: 50,
    targetPosition: 'middle',
    targetThreshold: 70,
    loseIsYellow: true,
    label: 'Attention seeking'
  }

  export const thirstBar =
  {
    max: 100,
    loseThreshold: 0,
    targetPosition: 'middle',
    targetThreshold: 90,
    loseIsYellow: true,
    label: 'Thirst Quenched'
  }


export default class LilahStatus extends Component {

  render() {
    return (
      <React.Fragment>
          <div className="status-bars">
            <StatusBar max={loveBar.max} current={this.props.loveCurrent} loseThreshold={loveBar.loseThreshold} targetThreshold={loveBar.targetThreshold} label={loveBar.label}/>
            <StatusBar max={attentionBar.max} current={this.props.attentionSeeked} loseThreshold={attentionBar.loseThreshold} targetThreshold={attentionBar.targetThreshold} label={attentionBar.label} targetPosition={attentionBar.targetPosition} loseIsYellow={attentionBar.loseIsYellow}/>
            <StatusBar max={thirstBar.max} current={this.props.thirstQuenched} loseThreshold={thirstBar.loseThreshold} targetThreshold={thirstBar.targetThreshold} label={thirstBar.label} />
          </div>
      </React.Fragment>
    );
  }
}
