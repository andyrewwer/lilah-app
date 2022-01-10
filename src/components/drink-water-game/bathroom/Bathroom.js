import './Bathroom.css';
import React, { Component } from 'react'
import Lilah from './lilah/Lilah'


export default class Bathroom extends Component {

  constructor(props) {
    super(props);
    this.gameService = this.props.gameService;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-lila">
          <Lilah lilaPos={this.props.lilahPos} gameService={this.gameService} />
        </div>
      </React.Fragment>
    );
  }
}
