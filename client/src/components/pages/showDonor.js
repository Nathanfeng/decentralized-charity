import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import Layout from "../reusable/Layout";
import { Form, Button} from "semantic-ui-react";
import ContributeForm from "../reusable/ContributeForm";
import MilestoneTable from "../reusable/MilestoneTable";
import Stats from "../reusable/Stats";
import Fund from "../../contracts/Fund.json";
import getWeb3 from "../../utils/getWeb3";
import truffleContract from "truffle-contract";
// import RequestRow from '../components/RequestRow';

class ShowDonor extends Component {

  state = {
    accounts:"",
    fundContract: "",
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

  onClaim = async (event) => {

    try {
    const {accounts, fundContract} = this.state;
    await fundContract.claimFunds({
        from:accounts[0]
      });
      // Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({loading: false})

  }


  render() {
      return (

        <Layout>

          <Stats/>

          <h3>Donate to this Fund</h3>
          <p>
            When the status of the fund is "Accepting Donations" you can
            donate to this fund
          </p>
          <ContributeForm />

          <div style={{ marginTop: "10px"}}>
            <NavLink to="/showManager">
               <div>Click here to view the fund details as a fund manager</div>
            </NavLink>
          </div>

          <h4>Current Milestones</h4>
          <MilestoneTable/>

          <h3>Claim Funds</h3>
          <p>
            Once the the donors vote and pass the milestone, the manager of
            the fund can move the fund on to the next milestone. Moving to the
            next milestone will pay the fund the next installment and open up voting
            on the next milestone.
          </p>
          <p>
            If the donors vote that the charity did not complete the milestone,
            then they have the option to claim their funds. When donors claim funds,
            they will be refunded the proportion that they had donated to the fund from
            the remaining funds.
          </p>

          <Form
            style={{ marginBottom: "30px"}}
            onSubmit={this.onClaim}
            error={!!this.state.errorMessage}
          >
            <Button primary>Claim Funds </Button>
          </Form>

        </Layout>
      );
    }
};

export default ShowDonor;
