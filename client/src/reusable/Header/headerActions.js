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

export const updateAccount = () => {
  return async (dispatch) => {
    const web3 = store.getState().web3.web3Instance;
    const accounts = await web3.web3Instance.eth.getAccounts();
    dispatch(retrieveCurrentAccount(accounts[0]));
  }
}
//
// export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
// function web3Initialized(result) {
//   return {
//     type: WEB3_INITIALIZED,
//     payload: result
//   }
// }
//
// const getWeb3 = () => {
//   return new Promise((resolve, reject) => {
//     // Wait for loading completion to avoid race conditions with web3 injection timing.
//     window.addEventListener('load', async dispatch => {
//       // Checking if Web3 has been injected by the browser (Mist/MetaMask)
//       if (typeof window.web3 !== 'undefined') {
//         // Use Mist/MetaMask's provider.
//         resolve(new Web3(window.web3.currentProvider));
//       } else {
//         console.log('NO_METAMASK');
//       }
//     });
//   });
// };
//
//
// export const initiateWeb3 = () => {
//   let web3;
//   return async (dispatch) => {
//     try {
//       debugger
//       web3 = await getWeb3();
//       debugger
//     } catch (e) {
//       console.error(e);
//     }
//
//     let result = {
//       web3Instance: web3
//     }
//
//     dispatch(web3Initialized(result));
//   }
// }
