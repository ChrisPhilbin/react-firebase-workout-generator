import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'

const App = () => {
  return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App