import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import MilestoneRowNew from './MilestoneRowNew';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";

export default class MilestoneData extends Component {

  render() {
    const {

    } = this.state; 
    return this.props.render({ web3, accounts, fundContract })
  }
}
