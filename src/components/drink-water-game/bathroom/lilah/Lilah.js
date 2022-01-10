import './Lilah.css';
import React, { Component } from 'react'

const lilah = require('../../../../assets/lilah-300.png');

export default class Lilah extends Component {

  render() {
    let marginTop = this.props.gameService.lilahInTargetPosition() ? '-100px' : '0px';
    return (
      <React.Fragment>
        <div className="lilah-container">
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
          <div className="lilah" style={{marginLeft: (this.props.lilahPos * 3.5) + 'px', marginTop: marginTop}}>
            <img src={lilah} width={'50px'} height={'50px'} alt='lilah'/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
