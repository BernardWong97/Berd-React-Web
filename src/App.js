import React, {useState, useEffect} from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import NotFound from './Pages/NotFound'
import Login from './Pages/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';

function App() {
  const [token, setToken] = useState()
  const [isAuthenticated, userHasAuthenticated] = useState(false)

  useEffect(() => {
    console.log(token)
  }, [token])

  if(!token){
    return(
      <div className="App">
        <Login setToken={setToken}/>
      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Sidebar/>
        <div className="Routes">
          <Switch>
            <Route path='/404' component={NotFound}/>
            <Route path='/dashboard' exact component={Dashboard}/>
            <Redirect to="/404"/>
          </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;
