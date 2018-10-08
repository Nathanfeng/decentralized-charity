import React, { Component } from "react";
import {Router} from 'react-router-dom'
import {initiateWeb3} from './utils/web3/web3Actions'
import store from './store';
import AppRouter from './routers/appRouter';

class App extends Component {

  constructor(props) {
    super(props)
    this.props.initiateWeb3();
  }
  // componentDidMount() {
  // }

  render() {
    return (
      <AppRouter/>
    )
  }
}

export default App;
