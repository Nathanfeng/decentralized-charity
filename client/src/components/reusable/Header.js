import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';
import getWeb3 from "../../utils/getWeb3";



class Header extends Component {
  state = {
    accounts: ""
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      this.setState({accounts }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
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

export default Header;
