import './LilahStats.css';
import React, { Component } from 'react'
import StatusBar from '../../../util/status-bar/StatusBar'

// TODO move to external configs
// TODO make this more generic to allow more bars and maybe colors
  export const loveBar =
  {
    max: 100,
    thresholds: [
      {
        type: 'LOSE',
        size: 20
      },
      {
        type: 'NONE',
        size: 50
      },
      {
        type: 'TARGET',
        size: 15
      },
      {
        type: 'NONE',
        size: 15 // PROBBALY NOT BEST WAY BUT WORKS FOR NOW
      },

    ],
    label: 'Love-o-meter'
  }

  export const thirstBar =
  {
    max: 100,
    thresholds: [
      {
        type: 'NONE',
        size: '95'
      },
      {
        type: 'TARGET',
        size: '5'
      }
    ],
    label: 'Thirst Quenched'
  }


export default class LilahStatus extends Component {

  render() {
    return (
      <React.Fragment>
          <div className="status-bars">
            <div className="status-bar">
              <StatusBar max={loveBar.max} current={this.props.loveCurrent} thresholds={loveBar.thresholds} label={loveBar.label}/>
            </div>
            <div className="status-bar">
              <StatusBar max={thirstBar.max} current={this.props.thirstQuenched} thresholds={thirstBar.thresholds} label={thirstBar.label} />
            </div>

          </div>
      </React.Fragment>
    );
  }
}
