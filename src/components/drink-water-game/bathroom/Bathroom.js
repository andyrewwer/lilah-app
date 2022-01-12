import './Bathroom.css';
import React, { Component } from 'react'
const lilah = require('../../../assets/lilah-300.png');


export default class Bathroom extends Component {

  constructor(props) {
    super(props);
    this.gameService = this.props.gameService;
  }

  render() {
    let bottom = this.props.gameService.lilahInTargetPosition() ? '95px' : '10px';

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
            <div className="lilah" style={{marginLeft: (this.props.lilahPos) + '%', bottom: bottom}}>
              <img src={lilah} width={'80px'} height={'80px'} alt='lilah'/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
