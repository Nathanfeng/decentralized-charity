import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import Layout from '../../reusable/Header/Layout';
import Stats from "../reusable/Stats";
import MilestoneTable from "../reusable/MilestoneTable";
import { Form, Table, Button} from "semantic-ui-react";
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class ShowManager extends Component {

  state = {
    fundContract: "",
    accounts: "",
    errorMessage: "",
    loading: false
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const fundContract = truffleContract(Fund);
      fundContract.setProvider(web3.currentProvider);
      const instance = await fundContract.deployed();

      this.setState({accounts, fundContract: instance }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  onActivate = async () => {
    const {accounts, fundContract} = this.state;

    try {
    await fundContract.activateFund({
        from: accounts[0]
      });
      // Router.pushRoute("/milestones");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})
  }

  onNextMilestone = async () => {

    try {
    const {accounts, fundContract} = this.state;
    await fundContract.nextMilestone({
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
      return (

        <Layout>
          <h2>{this.props.title}</h2>
          <p>{this.props.description}</p>
          <h4>
            Fund Stats
          </h4>
          <Stats/>
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

          <div style={{ marginBottom: "30px", marginTop: "10px"} }>
             <NavLink to='/showDonor'>
               <div>Click here to view the fund details as a donor </div>
             </NavLink>
          </div>

          <h4>Current Milestones</h4>
          <MilestoneTable/>

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
