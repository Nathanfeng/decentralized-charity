import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import Layout from "../reusable/Layout";
import Header from "../reusable/Header";
import { Form, Table, Button, Card, Grid} from "semantic-ui-react";
import ContributeForm from "../reusable/ContributeForm";
import MilestoneTable from "../reusable/MilestoneTable"
// import RequestRow from '../components/RequestRow';


class ShowManager extends Component {

  state = {
    errorMessage: "",
    loading: false
  };

  static async getInitialProps(props) {
    const {accounts, fundContract} = this.props;
    const milestoneCount = await fundContract.methods.getMilestonesCount().call();
    const milestones = await Promise.all(
      Array(parseInt(milestoneCount))
        .fill()
        .map((element, index) => {
          return fundContract.methods.milestones(index).call();
        })
    );
    const summary = await fundContract.methods.fundSummary().call();
    return {
      address: summary[0],
      totalDonors: summary[1],
      minNumberDonators: summary[2],
      totalDonated: summary[3],
      targetAmount: summary[4],
      acceptingDonations: summary[5],
      active: summary[6],
      title: summary[7],
      description: summary[8],
      milestones,
      milestoneCount,
      fundContract,
      accounts
    };
  }

  renderCards() {
    const {
      manager,
      totalDonors,
      minNumberDonators,
      totalDonated,
      targetAmount,
      acceptingDonations,
      active,
      accounts,
      fundContract,
      milestoneCount
    } = this.props;


    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description: "Manager that created this fund",
        style: { overflowWrap: "break-word"}
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
      meta: 'Total Donated',
      description:
        'The total amount donated to the fund so far'
    },
    {
      header: targetAmount,
      meta: 'Target Amount',
      description:
        'This is the minimum amount that the fund is hoping to raise'
    },
    {
      header: acceptingDonations,
      meta: 'Accepting Donations',
      description:
        'Number of people who have already donated to this fund'
    },
    {
      header: active,
      meta: 'Fund Acive',
      description:
        'Whether the fund has been activated by the fund manager'
    }
  ];

    return <Card.Group items= {items}/>;
  }

  onActivate = async () => {
    // event.preventDefault();

    try {
    const {accounts, fundContract} = this.props;
    await fundContract.methods.activateFund()
      .send({
        from:accounts[0]
      });
      // Router.pushRoute("/milestones");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})
  }

  onNextMilestone = async () => {

    try {
    const {accounts, fundContract} = this.props;
    await fundContract.methods.nextMilestone()
      .send({
        from:accounts[0]
      });
      // Router.pushRoute("/milestones");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})

  }

  renderRows = () => {
    const { Row, Cell } = Table;
    const {accounts, fundContract, milestones} = this.props;

    return this.props.milestones.map((milestone, index) => {
      return (

        <Row
          disabled={milestone.acceptingVotes}
          positive={!milestone.acceptingVotes}
        >
          <Cell>0</Cell>
          <Cell>{milestone.title}</Cell>
          <Cell>{milestone.description}</Cell>
          <Cell>
            {milestone.passingVotes / (milestone.passingVotes + milestone.failingVotes)}
          </Cell>
          <Cell>
            {milestone.acceptingVotes ? null : (
              <Button color="green" basic onClick={this.onPass}>
                Meets Milestone
              </Button>
            )}
          </Cell>
          <Cell>
            {milestone.acceptingVotes ? null : (
              <Button color="red" basic onClick={this.onFail}>
                Fails Milestone
              </Button>
            )}
          </Cell>
        </Row>
      );
    });

  }


  render() {
    const { Header, Row, HeaderCell, Body } = Table;
      return (

        <Layout>
          <h2>{this.props.title}</h2>
          <p>{this.props.description}</p>
          <h4>
            Fund Stats
          </h4>
          {this.renderCards()}

        <h3>Step 4: Activate Fund </h3>
          <p>
            Once the minimum number of donors and target amount has been
            raised, the fundManager can activate the fund, which pays out the
            first installment of the donations.
          </p>

          <Form
            onSubmit={this.onActivate}
            error={!!this.state.errorMessage}
          >
            <Button
              primary
            >
              Activate Fund
            </Button>
          </Form>

          <div style={{ marginBottom: "30px"}}>
             <NavLink to='/showDonor'>
               <a>Click here to view the fund details as a donor </a>
             </NavLink>
          </div>

          <h4>Current Milestones</h4>
          {/* <MilestoneTable/> */}

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
            {/* <Body>{this.renderRows()}</Body> */}
          </Table>

          <h3>Step 5: Next Milestone</h3>
          <p>
            Once you've exhausted your funds or have achieved your milestone, send a report to donors on your progress. This will allow them to vote on whether you've achieved those milestones. Once the the donors vote and pass the milestone, you can move the fund on to the next milestone by clicking below. Moving to the next milestone will pay the fund manager the next installment and open up voting on the next milestone.
          </p>

          <Form
            style={{ marginBottom: "30px"}}
            onSubmit={this.onNextMilestone}
            error={!!this.state.errorMessage}
          >
            <Button primary>Next Milestone</Button>
          </Form>

        </Layout>
      );
    }
};

export default ShowManager;