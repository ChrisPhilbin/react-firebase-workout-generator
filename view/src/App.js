import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PreviousWorkoutList from './components/PreviousWorkoutList';
import Home   from './pages/Home'
import Login  from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return(
    <Router>
      <div>
        <Switch>
          <Route exact path="/"                 component={Home}   />
          <Route exact path="/login"            component={Login}  />
          <Route exact path="/signup"           component={SignUp} />
          <Route exact path="/previousWorkouts" component={PreviousWorkoutList} />
        </Switch>
      </div>
    </Router>
  )
}

export default App