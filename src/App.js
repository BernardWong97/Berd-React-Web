import React, {useState} from 'react'
import './App.css';
import {AppContext} from './libs/contextLib'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

import NotFound from './Pages/NotFound'
import Login from './Pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/404' component={NotFound}/>
          <Route path='/dashboard' exact component={Dashboard}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
