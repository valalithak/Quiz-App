import React, { Component } from 'react';
import Sports from './Sports'
import SciTech from './SciTech'
import './Home.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Home extends Component {
  render() {
    return (
     <div className="App">
          <header className="App-header">
             <h1 className="App-title">Welcome to the Quiz App</h1>
          </header>
          <br/>
          <br/>
          <p>This is a web based quiz game built using Go and React.</p>

      <Router>
       <div>
       <br/>
         <Link to={'/Sports'}>Sports Quizzes</Link>
         <Switch>
           <Route exact path='/Sports' component={Sports} />
         </Switch>
         <br/>
         <br/>
         <Link to={'/SciTech'}>Science and Technology Quizzes</Link>
         <Switch>
           <Route exact path='/SciTech' component={SciTech} />
         </Switch>
       </div>
      </Router>
     </div>


    );
  }
}

export default Home;
