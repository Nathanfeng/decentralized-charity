import Fund from "../../contracts/Fund.json";
import store from '../../store';
const contract = require('truffle-contract')
export const FUND_STARTED = 'FUND_STARTED'

function fundStarted(
  {
    title = '',
    description = '',
    targetAmount = '',
    minNumberDonators = ''
  } = {}
) {
  return {
    type: FUND_STARTED,
    fundDetails: {
      title,
      description,
      targetAmount,
      minNumberDonators
    }
  }
}


export function startFund(fundDetails) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the authentication object.
      const fundContract = contract(Fund)
      fundContract.setProvider(web3.currentProvider)

      // Declaring this for later so we can chain functions on Authentication.
      var fundInstance

      // Get current accounts.

      web3.eth.getAccounts((error, accounts) => {
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        fundContract.deployed().then(function(instance) {
          fundInstance = instance
          // Attempt to login user.
          fundInstance.initializeFund(
            fundDetails.title,
            fundDetails.description,
            fundDetails.targetAmount,
            fundDetails.minNumberDonators,
            {from: accounts[0]})
          .then(function(result) {
            // If no error, update user.
            dispatch(fundStarted({
              "title": fundDetails.title,
              "description": fundDetails.description,
              "targetAmount": fundDetails.targetAmount,
              "minNumberDonators": fundDetails.minNumberDonators,
            }))

            return alert('Fund Started!')
          })
          .catch(function(result) {
            // If error...
          })
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}
