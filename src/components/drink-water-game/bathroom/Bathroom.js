import './Bathroom.css';
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFemale, faMale } from '@fortawesome/free-solid-svg-icons'

const lilah = require('../../../assets/lilah-300.png');

export default class Bathroom extends Component {

  constructor(props) {
    super(props);
    this.gameService = this.props.gameService;
  }

  render() {
    let lilahBottom = this.props.gameService.lilahInTargetPosition() ? '60px' : '-30px';
    const FEMALE = true;
    console.log(this.props.playerPos)
    return (
      <React.Fragment>
        <div className="lilah-container">
        <div className="mask"></div>
          <div className="counter">
            <div className="sink">
              <div className="sink-hole"></div>
              <div className="faucet"></div>
              <div className="knobs"></div>
            </div>
          </div>
          <div className="toilet">
            <div className="toilet-seat"></div>
            <div className="toilet-back">
              <div className="toilet-handle"></div>
            </div>
          </div>
          <div className="floor">
            <div className="lilah" style={{left: (this.props.lilahPos) + '%', bottom: lilahBottom}}>
              <img src={lilah} width={'80px'} height={'80px'} alt='lilah'/>
            </div>
            <div className="player" style={{left: (this.props.playerPos) + '%'}}>
              {FEMALE ?
                <FontAwesomeIcon icon={faFemale} className="female" />      :
                <FontAwesomeIcon icon={faMale} className="male" />
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
