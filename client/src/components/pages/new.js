import React, { Component} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from "../reusable/Layout";
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class FundNew extends Component {
  state = {
    accounts: null,
    fundContract: null,
    name: "",
    descrip: "",
    target: "",
    minDonors: "",
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

  onSubmit = async (event) => {
    this.setState({ loading: true, errorMessage: ""});
    const {name, descrip, target, minDonors, accounts, fundContract} = this.state;

    try {
    await fundContract.initializeFund(
      name,
      descrip,
      target,
      minDonors,
      { from: accounts[0] }
    );
      // Router.pushRoute("/milestones");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})
  };

  render() {
    return (
      <Layout>
        <h3>Step 1: Get Started Raising a Fund!</h3>
        <p>Enter information and requirements for your fund below</p>

      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Name of Fund</label>
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
        <Form.Field>
          <label>Contribution Goal</label>
          <Input
            label="wei"
            labelPosition= "right"
            value={this.state.targetAmount}
            onChange={event =>
              this.setState({ targetAmount:event.target.value })}
          />
        </Form.Field>

        <Form.Field>
          <label>Minimum Number of Donors</label>
          <Input
            value={this.state.minNumberDonators}
            onChange={event =>
              this.setState({ minNumberDonators:event.target.value })}
          />
        </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading ={this.state.loading} primary>Initialize Fund</Button>
        </Form>
      </Layout>
    );
  }
}


export default FundNew;
