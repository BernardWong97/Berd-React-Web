import React, {useState} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {AppContext} from './libs/contextLib'

import Dashboard from './components/Dashboard/Dashboard'
import Preferences from './components/Preferences/Preferences'
import NotFound from './components/Pages/NotFound'
import Login from './components/Pages/Login';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  return (
    <div className="App">
      <h1>Application</h1>
      
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/preferences">
            <Preferences/>
          </Route>
          <Route path=''>
            <NotFound/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
