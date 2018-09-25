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
