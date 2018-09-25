import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import getWeb3 from "../../utils/getWeb3";
import store from "../store";
import { connect } from 'react-redux'
import New from './new'
import { getAccounts } from './headerActions'


export class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accounts: props.accounts
    }
  }

  componentDidMount = async () => {
    this.getAccounts();
  };

  render(){
    return (
      <div style={{marginBottom: "30px"}}>
        <div className="ui secondary pointing menu">
          <NavLink to="/">
            <div className="active item">
              Home
            </div>
          </NavLink>

          <NavLink to="/new">
            <div className="item">
              Raise a Fund
            </div>
          </NavLink>

            <Menu.Menu position="right">
              <a className="item">
                Current Account: {this.state.accounts[0]}
              </a>
            </Menu.Menu>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    accounts: state.accounts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAccounts: () => {
      dispatch(getAccounts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
