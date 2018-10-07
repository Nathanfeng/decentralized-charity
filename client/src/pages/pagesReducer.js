const initialState = {
  fundInfo: {
    manager: '',
    totalDonors: '',
    minNumberDonators: '',
    totalDonated: '',
    targetAmount: '',
    acceptingDonations: '',
    active: '',
    title: '',
    description: ''
  },
  currentAccount: ''
  // milestones: {
  //
  // }


  //milestones

}

const pagesReducer = (state = initialState, action) => {
  if (action.type === 'FUND_STARTED')
  {
    return Object.assign({}, state.action.fundDetails)
  }
  if (action.type === 'GET_CURRENT_ACCOUNT')
  {
    return Object.assign({}, state.action.currentAccount)
  }

  return state
}

export default pagesReducer
