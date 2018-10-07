import { connect } from 'react-redux'
import Header from './header'
import { updateAccount } from './headerActions'

const mapStateToProps = (state, ownProps) => {
  return {
    currentAccount: state.currentAccount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: () => {
      dispatch(updateAccount())
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer;
