import React, {Component} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Home from "../pages/Home/home";
import Milestones from "../pages/Milestones/milestonesContainer";
import New from "../pages/New/newContainer";
import ShowDonor from "../pages/ShowDonor/showDonorContainer";
import ShowManager from "../pages/ShowManager/showManagerContainer";
import store from '../store'

class AppRouter extends Component {

  render(){
    const history = createHistory({
      basename: '',
  });
  return(
    <Router history={history}>
        <Switch>
          <Route path='/' component={Home} exact = {true}/>
          <Route path='/milestones' component={Milestones}/>
          <Route path='/new' component={New}/>
          <Route path='/showDonor' component={ShowDonor}/>
          <Route path='/showManager' component={ShowManager}/>
        </Switch>
    </Router>
  )
  }
}

export default AppRouter;
