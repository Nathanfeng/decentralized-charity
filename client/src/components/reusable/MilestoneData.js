import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import MilestoneRowNew from './MilestoneRowNew';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";

export default class MilestoneData extends Component {

  state = {
    accounts: "",
    fundContract: "",
    milestoneCount: "",
    milestones: ""
  };

  componentDidMount = async() => {
    try {
      console.log('mount');
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const fundContract = truffleContract(Fund);
      fundContract.setProvider(web3.currentProvider);
      const instance = await fundContract.deployed();
      let milestoneCount = await instance.getMilestonesCount({from: accounts[0]});
      milestoneCount = milestoneCount.toNumber();
      const milestones = await Promise.all(
        Array(milestoneCount)
          .fill()
          .map((element, index) => {
            return instance.returnMilestone(index, {from: accounts[0]});
          })
      );
      console.log(milestones);
      this.setState({accounts, fundContract: instance, milestoneCount, milestones}, this.runExample);
      // console.log(this.state.milestones[0][0], 'mount');
      console.log('endmount')
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  render() {
    const {
      accounts,
      fundContract,
      milestoneCount,
      milestones
    } = this.state;

    return this.props.render({ accounts, fundContract, milestoneCount, milestones })
  }
}
