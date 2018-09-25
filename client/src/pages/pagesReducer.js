const initialState = {
  //new
  title: "",
  description: "",
  targetAmount: "",
  minNumberDonators: "",
  errorMessage: "",
  loading: false,
  //milestones

}

const pagesReducer = (state = initialState, action) => {
  if (action.type === 'FUND_STARTED')
  {
    return Object.assign({}, state,action.fundDetails)
  }

  return state
}

export default pagesReducer
