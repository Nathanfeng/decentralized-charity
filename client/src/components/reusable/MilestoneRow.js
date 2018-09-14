import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class MilestoneRow extends Component {

  state = {
    accounts: "",
    fundContract: "",
    milestoneTitle: "",
    milestoneDescription: "",
    passingVotes: "",
    failingVotes: "",
    acceptingVotes: ""
  }

  componentWillMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const fundContract = truffleContract(Fund);
      fundContract.setProvider(web3.currentProvider);
      const instance = await fundContract.deployed();
      const milestoneInfo = await instance.returnMilestone(
        this.props.id,
        {from: accounts[0]}
      );

      // console.log(this.props.id);

      this.setState({
        accounts,
        fundContract: instance,
        milestoneTitle: milestoneInfo[0],
        milestoneDescription: milestoneInfo[1],
        passingVotes: milestoneInfo[2],
        failingVotes: milestoneInfo[3],
        acceptingVotes: milestoneInfo[5]
       }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  onPass = async () => {
    try {
    const {accounts, fundContract} = this.state;
    await fundContract.recordVote(true, {from: accounts[0]});
      // Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})
  };

  onFail = async () => {
    try {
    const {accounts, fundContract} = this.state;
    await fundContract.recordVote(false, {from: accounts[0]});
      // Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})
  };

  render() {
    const { Row, Cell } = Table;
    const {
      milestoneTitle,
      milestoneDescription,
      passingVotes,
      failingVotes,
      acceptingVotes
    } = this.state;

    console.log(this.props.id);

    return (
      <Row
        disabled={acceptingVotes}
        positive={!acceptingVotes}
      >
        <Cell>{this.props.id}</Cell>
        <Cell>{milestoneTitle}</Cell>
        <Cell>{milestoneDescription}</Cell>
        <Cell>
          {passingVotes / (passingVotes + failingVotes)}
        </Cell>
        <Cell>
          {acceptingVotes ? null : (
            <Button color="green" basic onClick={this.onPass}>
              Meets Milestone
            </Button>
          )}
        </Cell>
        <Cell>
          {acceptingVotes ? null : (
            <Button color="red" basic onClick={this.onFail}>
              Fails Milestone
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default MilestoneRow;
