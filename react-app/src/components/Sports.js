import React, { Component } from 'react';
import './ViewQuestions.css';
import Sports1 from './Sports1';
import Sports2 from './Sports2';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


 class Sports extends Component {
    constructor() {
    super();
    this.state = {
    data: [],

  }

}

// Lifecycle hook, runs after component has mounted onto the DOM structure
componentDidMount() {
const request = new Request('http://127.0.0.1:8080/sports');
fetch(request)
  .then(response => response.json())
    .then(data => this.setState({data: data}));
}

render() {
  return (
     <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select a quiz from Sports genre</h1>
        </header>
            <br/>
            <Router>
             <div>

             <Link to={'/Sports1'}>Quiz 1 - Single Correct Answer</Link><br/><br/>
             <Link to={'/Sports2'}>Quiz 2 - One or more Correct Answers</Link>
             <Switch>
               <Route exact path='/Sports1' component={Sports1} />
               <Route exact path='/Sports2' component={Sports2} />
             </Switch>
           </div>
          </Router>
             <br/>
             <br/>

     </div>
  );
 }
}

export default Sports;
