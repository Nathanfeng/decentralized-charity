import React, { Component } from "react";
import Fund from "./contracts/Fund.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import Index from './components/pages/index';
import Milestones from './components/pages/milestones';
import Router from './routers/appRouter';

class App extends Component {
  render() {
    return (
      <div>
        <Milestones/>
      </div>
    )
  }
}

export default App;
