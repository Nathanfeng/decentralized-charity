import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import pagesReducer from './pages/pagesReducer'
import web3Reducer from './utils/web3/web3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: pagesReducer,
  web3: web3Reducer
})

export default reducer
