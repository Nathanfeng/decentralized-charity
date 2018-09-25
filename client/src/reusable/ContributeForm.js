import React, {Component} from 'react';
import {Form, Input, Message, Button} from "semantic-ui-react";
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";


class ContributeForm extends Component {

  state = {
    value: "",
    account: "",
    fundContract: ""
  }


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



  onSubmit = async event => {
    this.setState({ loading: true, errorMessage: '' });
    const { fundContract, accounts, value} = this.state;
    try {
      console.log(accounts[0]);
      await fundContract.makeDonation({
        from: accounts[0],
        value
      });
      // Router.replaceRoute(`/show`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="wei"
            labelPosition="right"
          />
        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
