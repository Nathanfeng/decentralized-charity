import Fund from "../../contracts/Fund.json";
import store from '../../store';
const contract = require('truffle-contract')

export const GET_ACCOUNTS = 'GET_ACCOUNTS';
export const retrieveAccounts = (accounts) => {
  return {
    type: GET_ACCOUNTS,
    payload: accounts
  }
}

export function getAccounts() {
  let web3 = store.getState().web3.web3Instance;

  // if (typeof web3 !== 'undefined') {

  web3.eth.getAccounts().then(function(accounts) {
    // if (error) {
    //   console.error(error);
    // }
    dispatch(retrieveAccounts({"accounts": accounts}))
  }
  // } else {
  //   console.error('Web3 is not initialized.');
  // }
}
