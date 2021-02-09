import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  )
}

export default App