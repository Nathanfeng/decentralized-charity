import React, { Component} from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../reusable/Header/Layout';
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class FundNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: this.props.accounts,
      fundContract: this.props.fundContract,
      title: this.props.title,
      description: this.props.description,
      targetAmount: this.props.targetAmount,
      minNumberDonators: this.props.minNumberDonators,
      errorMessage: this.props.errorMessage,
      loading: this.props.loading
    }
  }


  onSubmit = async (event) => {
    this.setState({ loading: true, errorMessage: ""});
    const {
      title,
      description,
      targetAmount,
      minNumberDonators,
      accounts,
      fundContract
    } = this.state;

    try {
    await fundContract.initializeFund(
      title,
      description,
      targetAmount,
      minNumberDonators,
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
