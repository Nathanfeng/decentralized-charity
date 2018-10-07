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
  }
  //milestones

}

const userReducer = (state = initialState, action) => {
  if (action.type === 'FUND_STARTED')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }
  return state
}

export default userReducer
