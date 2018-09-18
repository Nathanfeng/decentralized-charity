import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import MilestoneRowNew from './MilestoneRowNew';
// import MilestoneData from './MilestoneData';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class MilestoneTable extends Component {

  getMilestoneInfo = async () => {
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
    return milestones;
  }

  renderRows = async () => {
    const milestones = await this.getMilestoneInfo();

    const array = milestones.map((milestone, index) => {
      console.log(index)
      console.log(typeof milestone[2].toNumber())

      return (
        <MilestoneRowNew
          key={index}
          id={index}
          milestoneTitle={milestone[0]}
          milestoneDescription={milestone[1]}
          passingVotes={milestone[2].toNumber()}
          failingVotes={milestone[3].toNumber()}
          acceptingVotes={milestone[4]}
        />
      )
    })
    console.log(array)
    return array;
  }

  render() {
    console.log([
        <MilestoneRowNew
          key={0}
          id={0}
          milestoneTitle={'first'}
          milestoneDescription={'first milestone'}
          passingVotes={1}
          failingVotes={2}
          acceptingVotes={true}
        />,
        <MilestoneRowNew
          key={1}
          id={1}
          milestoneTitle={'second'}
          milestoneDescription={'second milestone'}
          passingVotes={1}
          failingVotes={2}
          acceptingVotes={false}
        />
    ]);
    console.log('render')
    // this.renderRows();
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
        {/* <Body>{[
            <MilestoneRowNew
              key={0}
              id={0}
              milestoneTitle={'first'}
              milestoneDescription={'first milestone'}
              passingVotes={1}
              failingVotes={2}
              acceptingVotes={true}
            />,
            <MilestoneRowNew
              key={1}
              id={1}
              milestoneTitle={'second'}
              milestoneDescription={'second milestone'}
              passingVotes={1}
              failingVotes={2}
              acceptingVotes={false}
            />
        ]}</Body> */}
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
