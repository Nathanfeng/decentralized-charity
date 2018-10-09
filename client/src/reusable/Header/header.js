import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import store from "../../store";
import New from '../../pages/New/new';
import { updateAccount } from './headerActions';


export class Header extends Component {


  componentDidMount = () => {
    console.log('we are in header')
    debugger
    this.props.updateAccount()
    // const Store = store;
    // if(Store.getState().web3.web3Instance) {
    // }
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
                Current Account: {store.getState().currentAccount}
              </a>
            </Menu.Menu>
          </div>
        </div>
    )
  }
}

export default Header;
