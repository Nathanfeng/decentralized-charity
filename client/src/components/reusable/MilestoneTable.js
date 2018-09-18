import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import MilestoneRowNew from './MilestoneRowNew';
// import MilestoneData from './MilestoneData';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class MilestoneTable extends Component {

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
      this.setState({accounts, fundContract: instance, milestoneCount, milestones}, this.runExample);
      console.log(this.state.milestones[0][0], 'mount');
      console.log('endmount')
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }


  renderRows = () => {
    const {
      accounts,
      fundContract,
      milestones,
      milestoneCount
    } = this.state

    console.log(milestones, 'milestones print');
    return Array(milestoneCount).map((_, index) => {
      console.log(milestoneCount);
      return (
        <MilestoneRowNew
          key={index}
          id={index}
          milestoneTitle={milestones[0]}
          milestoneDescription={milestones[1]}
          passingVotes={milestones[2]}
          failingVotes={milestones[3]}
          acceptingVotes={milestones[4]}
        />
      )
    })
  }

  render() {
    console.log('render')
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

// export default () => (
//   <MilestoneData
//     render={({accounts, fundContract, milestones, milestoneCount }) => (
//       <MilestoneTable
//         accounts={accounts}
//         fundContract={fundContract}
//         milestones={milestones}
//         milestoneCount={milestoneCount}
//       />
//     )}
//   />
// )
