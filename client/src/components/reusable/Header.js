import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';


export default () => (
  // return (
    <div style={{marginBottom: "30px"}}>
      <div className="ui secondary pointing menu">
        <NavLink to="/">
          <a className="active item">
            Home
          </a>
        </NavLink>

        <NavLink to="/new">
          <a className="item">
            Raise a Fund
          </a>
        </NavLink>

        <Menu.Menu position="right">
          <a className="item">
            {/* Current Account: {accounts[0]} */}
          </a>
        </Menu.Menu>
      </div>
    </div>

  // )
)
