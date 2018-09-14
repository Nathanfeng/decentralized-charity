import React, { Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Menu} from 'semantic-ui-react';


export default () => (
  // return (
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
            {/* Current Account: {accounts[0]} */}
          </a>
        </Menu.Menu>
      </div>
    </div>

  // )
)
