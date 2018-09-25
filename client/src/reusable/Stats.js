import React, {Component} from 'react';
import {Card} from "semantic-ui-react";
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";

class Stats extends Component {
  state = {
    manager: "",
    totalDonors: "",
    minNumberDonators: "",
    totalDonated: "",
    targetAmount: "",
    acceptingDonations: "",
    active: "",
    title: "",
    description: "",
    fundContract: "",
    milestoneCount: 0,
    accounts: ""
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const fundContract = truffleContract(Fund);
      fundContract.setProvider(web3.currentProvider);
      const instance = await fundContract.deployed();
      let milestoneCount = await instance.getMilestonesCount({from: accounts[0]});
      const summary = await instance.fundSummary({from: accounts[0]});

      this.setState({
        manager: summary[0],
        totalDonors: summary[1].toNumber(),
        minNumberDonators: summary[2].toNumber(),
        totalDonated: summary[3].toNumber(),
        targetAmount: summary[4].toNumber(),
        acceptingDonations: summary[5].toString(),
        active: summary[6].toString(),
        title: summary[7].toString(),
        description: summary[8].toString(),
        fundContract: instance,
        milestoneCount: milestoneCount.toNumber(),
        accounts
      }, this.runExample);

    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  renderCards = ()=> {
    const {
      manager,
      totalDonors,
      minNumberDonators,
      totalDonated,
      targetAmount,
      acceptingDonations,
      active,
      milestoneCount
    } = this.state;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: "Manager that created this fund",
        style: { overflowWrap: "break-word"}
      },

      {
      header: milestoneCount,
      meta: 'Number of Milestones',
      description:
        'This is the total number of milestones in the fund'
    },
      {
      header: totalDonors,
      meta: 'Total Donors',
      description:
        'This is the total number of addresses that have donated to the fund'
    },
    {
      header: minNumberDonators,
      meta: 'Minimum Number of Donors',
      description:
        'The minimum number of donors for the fund to be deployed'
    },
    {
      header: totalDonated,
      meta: 'Amount Donated',
      description:
        'The total amount donated to the fund so far in wei'
    },
    {
      header: targetAmount,
      meta: 'Target Amount',
      description:
        'This is the minimum amount in wei that the fund is hoping to raise to deploy the fund'
    },
    {
      header: acceptingDonations,
      meta: 'Accepting Donations',
      description:
        'Whether a donor can donate to the current fund'
    },
    {
      header: active,
      meta: 'Accepting Votes',
      description:
        'Whether the fund is accepting votes from donors on milestones'
    }
  ];
    return <Card.Group items= {items}/>
  }

  render() {
    return (
      <div>
        <h2>{this.state.title.toString()}</h2>
        <p>{this.state.description.toString()}</p>
        {this.renderCards()}
      </div>
    )
  }
}

export default Stats;
