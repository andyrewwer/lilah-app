import './StatusBar.css';
import React, { Component } from 'react'
const classNames = require('classnames');

export default class StatusBar extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div className="center-balance"><span>{this.props.label}</span></div>
        <div className='balanceBar'>
          {this.props.thresholds.map((threshold,index) => (
            <span key={index} className={classNames('balanceSection', {'loseSection': threshold.type === 'LOSE'}, {'middleSection': threshold.type === 'NONE'}, {'winSection': threshold.type === 'TARGET'})} style={{'width': threshold.size+'%'}}></span>
          ))}
          <div className='balanceSection current' style={{'width': this.props.current+1+'%'}}></div>
        </div>
      </div>
    );
  }
}
