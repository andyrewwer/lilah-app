import './Lila.css';
import React, { Component } from 'react'
const lila = require('../../../assets/lila-300.png');

export default class Lila extends Component {

  constructor() {
    super();
  }


  render() {
    let marginTop = this.props.gameService.lilaInTargetPosition() ? '-100px' : '0px';
    return (
      <React.Fragment>
      <div className="lila-container">
        <div className="sink"></div>
        <div className="lila" style={{marginLeft: (this.props.lilaPos * 4.5) + 'px', marginTop: marginTop}}>
          <img src={lila} width={'50px'} height={'50px'}/>
        </div>

      </div>
      </React.Fragment>
    );
  }
}
