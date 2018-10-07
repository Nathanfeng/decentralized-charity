import Fund from "../../contracts/Fund.json";
import store from '../../store';
const contract = require('truffle-contract')
export const FUND_STARTED = 'FUND_STARTED'

function updateFund(
  {
    manager = '',
    totalDonors = '',
    minNumberDonators = '',
    totalDonated = '',
    targetAmount = '',
    acceptingDonations = '',
    active = '',
    title = '',
    description = ''
  } = {}
) {
  return {
    type: FUND_STARTED,
    fundInfo: {
      manager,
      totalDonors,
      minNumberDonators,
      totalDonated,
      targetAmount,
      acceptingDonations,
      active,
      title,
      description
    }
  }
}

export const startFund = async (fundDetails) => {
  const web3 = store.getState().web3.web3Instance;
  const accounts = await store.getState().web3.web3Instance.eth.getAccounts();
  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {
    try {
      const fundContract = contract(Fund)
      fundContract.setProvider(web3.currentProvider)
      const fundInstance = fundContract.deployed();
      await fundInstance.initializeFund(
        fundDetails.title,
        fundDetails.description,
        fundDetails.targetAmount,
        fundDetails.minNumberDonators,
        {from: accounts[0]}
      );
      updateFundInfo();
      return alert('Fund Started!');
    } catch(err) {
        console.log(err);
      }
  } else {
    console.error('Web3 is not initialized.');
  }
}

export const updateFundInfo = async () => {
  const web3 = store.getState().web3.web3Instance;
  const accounts = await store.getState().web3.web3Instance.eth.getAccounts();

  if (typeof web3 !== 'undefined') {
    try {
      const fundContract = contract(Fund);
      fundContract.setProvider(web3.currentProvider);
      const fundInstance = fundContract.deployed();
      const summary = await fundInstance.fundSummary({from: accounts[0]});

      this.props.dispatch(updateFund(
        summary[0],
        summary[1].toNumber(),
        summary[2].toNumber(),
        summary[3].toNumber(),
        summary[4].toNumber(),
        summary[5].toString(),
        summary[6].toString(),
        summary[7].toString(),
        summary[8].toString()
      ));
    } catch(err) {
      console.log(err);
    }
  } else {
    console.error('Web3 is not initialized.');
  }

}
