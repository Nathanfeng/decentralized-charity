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


export const updateAccount = async() => {
  const Store = store;
  debugger
  const web3 = Store.getState().web3.web3Instance;
  const accounts = await Store.getState().web3.web3Instance.eth.getAccounts();
  return (dispatch) => {
    dispatch(retrieveCurrentAccount(accounts[0]));
  }
}
