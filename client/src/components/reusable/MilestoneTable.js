import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import MilestoneRow from './MilestoneRow';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";

class MilestoneTable extends Component {
  state = {
    accounts: "",
    fundContract: "",
    milestones: ""
  }

  componentWillMount = async () => {
    try {
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
            return instance.milestones(index, {from: accounts[0]});
        })
      );
      this.setState({accounts, fundContract: instance, milestones, milestoneCount}, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  renderRows() {
    return Array(this.state.milestoneCount).fill().map((_, index) => {
      console.log(index);
      return <MilestoneRow key={index} id={index}/>
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Title</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Pass Rate</HeaderCell>
            <HeaderCell>Meets Milestone</HeaderCell>
            <HeaderCell>Fails Milestone</HeaderCell>
          </Row>
        </Header>
        <Body>{this.renderRows()}</Body>
      </Table>
    )
  }

}

export default MilestoneTable;
