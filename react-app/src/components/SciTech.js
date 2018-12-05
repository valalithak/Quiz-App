import React, { Component } from 'react';
import './ViewQuestions.css';
import SciTech1 from './SciTech1';
import SciTech2 from './SciTech2';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


 class SciTech extends Component {
    constructor() {
    super();
    this.state = {
    data: [],

  }

}

// Lifecycle hook, runs after component has mounted onto the DOM structure
componentDidMount() {
const request = new Request('http://127.0.0.1:8080/SciTech');
fetch(request)
  .then(response => response.json())
    .then(data => this.setState({data: data}));
}

render() {
  return (
     <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select a quiz from Science and Technology genre</h1>
        </header>
            <br/>
            <Router>
             <div>
             <br/>
             <Link to={'/SciTech1'}>Quiz 1 - Single Correct Answer</Link>
             <br/><br/>
              <Link to={'/SciTech2'}>Quiz 2 - One or more Correct Answers</Link>
             <Switch>
               <Route exact path='/SciTech1' component={SciTech1} />
                 <Route exact path='/SciTech2' component={SciTech2} />
             </Switch>
           </div>
          </Router>
             <br/>
             <br/>

     </div>
  );
 }
}

export default SciTech;
