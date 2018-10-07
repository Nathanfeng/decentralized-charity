import { connect } from 'react-redux'
import App from './App'
import { initiateWeb3 } from './utils/web3/web3Actions'

const mapStateToProps = (state, ownProps) => {
  return {
    web3Instance: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initiateWeb3: () => {
      dispatch(initiateWeb3())
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer;
