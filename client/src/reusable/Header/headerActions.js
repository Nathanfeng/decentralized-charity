import Fund from "../../contracts/Fund.json";
import store from '../../store';
const contract = require('truffle-contract')


export const GET_CURRENT_ACCOUNT = 'GET_CURRENT_ACCOUNT';
const retrieveCurrentAccount = (currentAccount) => {
  return {
    type: GET_CURRENT_ACCOUNT,
    currentAccount
  }
}


export const updateAccount = async () => {

  const web3 = store.getState().web3.web3Instance;
  const accounts = await store.getState().web3.web3Instance.eth.getAccounts();
  this.props.dispatch(retrieveCurrentAccount(accounts[0]));
}
