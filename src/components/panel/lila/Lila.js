import './Lila.css';
import React, { Component } from 'react'

export default class Lila extends Component {

  constructor() {
    super();
  }


  render() {
    let marginTop = this.props.lilaPos > 19 && this.props.lilaPos < 40 ? '-60px' : '0px'
    return (
      <React.Fragment>
        <div className="lila-container">
          <div className="sink"></div>
          <div className="lila" style={{marginLeft: (this.props.lilaPos * 4.5) + 'px', marginTop: marginTop}}>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
