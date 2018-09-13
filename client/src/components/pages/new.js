import React, { Component} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from "../reusable/Layout";
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class FundNew extends Component {
  state = {
    name: "",
    descrip: "",
    target: "",
    minDonors: "",
    errorMessage: "",
    loading: false
  };
state = { storageValue: 0, web3: null, accounts: null, contract: null };

componentDidMount = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const Contract = truffleContract(Fund);
    Contract.setProvider(web3.currentProvider);
    const instance = await Contract.deployed();

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    this.setState({ web3, accounts, contract: instance }, this.runExample);
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.log(error);
  }
};

  onSubmit = async (event) => {
    this.setState({ loading: true, errorMessage: ""});
    const {name, descrip, target, minDonors} = this.state;

    try {
    const {accounts, fundContract} = this.props;
    await fundContract.methods.initializeFund(
      name,
      descrip,
      target,
      minDonors
    )
      .send({
        from:accounts[0]
      });
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
