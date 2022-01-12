import './StatusBar.css';
import React, { Component } from 'react'
const classNames = require('classnames');

export default class StatusBar extends Component {

  constructor(props) {
    super(props);
    this.setCurrent = this.setCurrent.bind(this);
  }

  setCurrent(amount) {
    this.setState({current: amount});
  }

  render() {

    let loseThreshold = (this.props.loseThreshold / this.props.max * 100);
    let targetThreshold = 100 - (this.props.targetThreshold / this.props.max * 100);
    let middleSection = 100 - loseThreshold - targetThreshold;
    let current = (this.props.current / this.props.max * 100);

    return (
      <div>
        <div className="center-balance"><span>{this.props.label}</span></div>
        <div className='balanceBar'>
          <span className={classNames('balanceSection', {'loseSection': !this.props.loseIsYellow}, {'middleSection': this.props.loseIsYellow})} style={{'width': loseThreshold+'%'}}></span>
          <span className={classNames('balanceSection', {'middleSection': this.props.targetPosition !== 'middle'}, {'winSection': this.props.targetPosition === 'middle'})} style={{'width': middleSection+'%'}}></span>
          <span className={classNames('balanceSection', {'middleSection': this.props.targetPosition === 'middle'}, {'winSection': this.props.targetPosition !== 'middle'})} style={{'width': targetThreshold+'%'}}></span>
          <div className='balanceSection current' style={{'width': current+'%'}}></div>
        </div>
      </div>
    );
  }
}
