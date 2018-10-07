import { connect } from 'react-redux'
import New from './new'
import { startFund, updateFundInfo } from './newActions'

const mapStateToProps = (state, ownProps) => {
  return {
    title: state.fundDetails.title,
    description: state.fundDetails.description,
    targetAmount: state.fundDetails.targetAmount,
    minNumberDonators: state.fundDetails.minNumberDonators
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewFundFormSubmit: (fundDetails) => {
      dispatch(startFund(fundDetails))
    }
  }
}

const newContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(New)

export default newContainer;
