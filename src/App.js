import React from 'react';
import './App.css';
import Nav from './Components/Nav'
import UserListDashboard from './Components/UserListDashboard'
import UserEditDashboard from './Components/UserEditDashboard'
import MyProfile from './Components/MyProfile'
import Logout from './Components/Logout'
import Upload from './Components/Upload'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Switch>
          <Route exact path='/users' component={UserListDashboard}/>
          <Route path='/user/:id?' component={UserEditDashboard}/>
          <Route path='/my-profile' component={MyProfile}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/upload' component={Upload} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
