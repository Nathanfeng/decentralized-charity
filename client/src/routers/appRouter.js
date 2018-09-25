import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from "../pages/Home/home";
import Milestones from "../pages/Milestones/milestonesContainer";
import New from "../pages/New/newContainer";
import ShowDonor from "../pages/ShowDonor/showDonorContainer";
import ShowManager from "../pages/ShowManager/showManagerContainer";

class Router extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' component={Home} exact = {true}/>
            <Route path='/milestones' component={Milestones}/>
            <Route path='/new' component={New}/>
            <Route path='/showDonor' component={ShowDonor}/>
            <Route path='/showManager' component={ShowManager}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default Router;
