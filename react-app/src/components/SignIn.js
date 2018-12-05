import React, { Component } from 'react';
import DeleteQuestion from './DeleteQuestion';
import ViewQuestions from './ViewQuestions';
import NewQuestion from './NewQuestion';
import Home from './Home';
import Sports from './Sports'
import Sports1 from './Sports1'
import SciTech from './SciTech'
import SciTech1 from './SciTech1'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class SignIn extends Component {
    constructor() {
      super();
      this.state = {
        formData: {
          username: "",
          password: "",
      },
    }
      this.handleUChange = this.handleUChange.bind(this);
      this.handlePChange = this.handlePChange.bind(this);
      this.handleSignIn = this.handleSignIn.bind(this);
}
handleSignIn (event) {
  event.preventDefault();
  //console.log(this.state.formData)
  fetch('http://localhost:8080/SignIn', {
   method: 'POST',
   body: JSON.stringify(this.state.formData),
 })
    .then(response => {
      if(response.status == 200)
        sessionStorage.setItem("isLoggedIn",true)

        window.location.reload();
    });
}
handleUChange(event) {
  this.state.formData.username = event.target.value;
}
handlePChange(event) {
  this.state.formData.password = event.target.value;
}
render() {
return (

  <div>
  <div>
  <Router>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to={'/'}>Quiz App</Link>
         </div>
      </div>
     </nav>
    </Router>
    </div>
  <form onSubmit={this.handleSignIn}>
    <h3>Welcome to the Quiz App!</h3>

    <div className="form-group">
        <label>Username</label>
        <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
    </div>

    <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
    </div>
    <button type="submit" className="btn btn-default" onclick>Sign In</button>
  </form><br/>
  </div>

);
}
}
export default SignIn;
