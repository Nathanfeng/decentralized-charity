import React, { Component} from 'react';
import { Table, Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from "../reusable/Layout";
import Router from '../../routers/appRouter';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";

class Milestones extends Component {

  state = {
    accounts: "",
    fundContract: "",
    title: "",
    description: "",
    addErrorMessage: "",
    deployErrorMessage: "",
    addLoading: false,
    deployLoading: false
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

  onAdd = async (event) => {
    const {title, description, fundContract, accounts} = this.state;
    this.setState({ addLoading: true, errorMessage: ""})

    try {
      console.log(fundContract);
      await fundContract.addMilestone(title, description, { from: accounts[0] });
      this.setState({title: "", description: ""});
      // Router.pushRoute("/milestones");
    } catch (err) {
      this.setState({ addErrorMessage: err.message });
    }

    this.setState({ addLoading: false });
  };

  onDeploy = async (event) => {
    const {title, description, fundContract, accounts} = this.state;
    this.setState({ deployLoading: true, errorMessage: ""})

    try {
      await fundContract.deployFund({from: accounts[0]});
      // Router.pushRoute("/showManager");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ deployLoading: false });
  };


  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h3>Step 2: Add Milestones to Your Fund</h3>
        <p>
          Now that you've initialized the fund, its time to add milestones
          that your donors will use to evaluate your performance. If over
          50% of votes that are that you've achieved your milestone, then
          you will receive the next portion of your funding.
        </p>
        <p>
          The milestones will divide the total funds into equal installments
          (ie. with 2 milestones, the fund will be paid in 3 installments).
          When the fund is deployed, the first installment is paid t. The
          fund will need at least 1 milestone to be deployed.
        </p>

        <Form onSubmit={this.onAdd} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Title</label>
            <Input
              value={this.state.title}
              onChange={event =>
                this.setState({ title: event.target.value })}
              />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description:event.target.value })}
            />
          </Form.Field>
          <Button loading ={this.state.loading} primary>Add Milestone</Button>
        </Form>

        <h3>All Milestones</h3>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Pass Rate</HeaderCell>
              <HeaderCell >Meets Milestone</HeaderCell>
            </Row>
          </Header>
          {/* <Body>{this.renderRows()}</Body> */}
        </Table>

        <h3 style={{marginTop: "40px"}}>Step3: Deploy the Fund </h3>
        <p>
          After adding at least 1 milestone to your fund you can now deploy
          the fund so people can donate to it. Go ahead and hit the Deploy Fund button if
          you want to deploy and open the fund up for donations!
        </p>

        <Form onSubmit={this.onDeploy} error={!!this.state.errorMessage}>
          <Button loading ={this.state.loading} primary>Deploy Fund!</Button>
        </Form>
      </Layout>
    );
  }
}

export default Milestones;
