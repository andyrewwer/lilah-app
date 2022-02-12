import './PlayerStats.css';
import React, { Component } from 'react'
import StatusBar from '../../../util/status-bar/StatusBar'

// TODO move to external configs
// TODO make this more generic to allow more bars and maybe colors
  export const toiletBar =
  {
    max: 100,
    thresholds: [
      {
        type: 'NONE',
        size: 70
      },
      {
        type: 'TARGET',
        size: 21
      },
      {
        type: 'LOSE',
        size: 9 // too much poop
      }
    ],
    label: 'toilet-o-meter'
  }

  export const teethBar =
  {
    max: 100,
    thresholds: [
      {
        type: 'NONE',
        size: '96'
      },
      {
        type: 'TARGET',
        size: '4'
      }
    ],
    label: 'Teeth brushed'
  }


export default class PlayerStats extends Component {

  render() {
    return (
      <React.Fragment>
          <div className="status-bars">
            <div className="status-bar">
              <StatusBar max={toiletBar.max} current={this.props.toiletCurrent} thresholds={toiletBar.thresholds} label={toiletBar.label}/>
            </div>
            <div className="status-bar">
              <StatusBar max={teethBar.max} current={this.props.teethCurrent} thresholds={teethBar.thresholds} label={teethBar.label} />
            </div>

          </div>
      </React.Fragment>
    );
  }
}
