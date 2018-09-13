import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Index from "../components/pages/index";
import Milestones from "../components/pages/milestones";
import New from "../components/pages/new";
import ShowDonor from "../components/pages/showDonor";
import ShowManager from "../components/pages/showManager";
import App from '../App';

class Router extends Component {
  render(){
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' component={Index} exact = {true}/>
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
