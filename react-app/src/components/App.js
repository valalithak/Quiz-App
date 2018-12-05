import React, { Component } from 'react';
import DeleteQuestion from './DeleteQuestion';
import DeleteMultiQuestion from './DeleteMultiQuestion';
import ViewQuestions from './ViewQuestions';
import ViewMultiQuestions from './ViewMultiQuestions';
import NewQuestion from './NewQuestion';
import NewMultiQuestion from './NewMultiQuestion';
import Home from './Home';
import Sports from './Sports'
import Sports1 from './Sports1'
import Sports2 from './Sports2'
import SciTech from './SciTech'
import SciTech1 from './SciTech1'
import SciTech2 from './SciTech2'
import ViewUsers from './ViewUsers';
import DeleteUser from './DeleteUser';
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
    constructor() {
      super();
      this.state = {
        formData: {
          username: "",
          email: "",
          password: "",
      },
    }
      this.handleUChange = this.handleUChange.bind(this);
      this.handleEChange = this.handleEChange.bind(this);
      this.handlePChange = this.handlePChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleSignIn = this.handleSignIn.bind(this);

}
    handleSubmit (event) {
      event.preventDefault();
      //console.log(this.state.formData)
      fetch('http://localhost:8080/SignUp', {
       method: 'POST',
       body: JSON.stringify(this.state.formData),
     })
        .then(response => {
          if(response.status == 200)
            sessionStorage.setItem("isLoggedIn",true)
            window.location.reload();
        });
    }

    handleSignIn (event) {
        event.preventDefault();
        fetch('http://localhost:8080/SignIn', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),
       })
          .then(response => {
            if(response.status == 200){
                sessionStorage.setItem("isLoggedIn",true)
                sessionStorage.setItem("isAdmin",true)
            }
            else if(response.status == 201)
                sessionStorage.setItem("isLoggedIn",true)

             else if(response.status == 301)
                 alert("Invalid Username")

             else if(response.status == 302)
                 alert("Incorrect Password")

             else if(response.status == 303)
                 alert("Incorrect MailID")

             window.location.reload();

          });

    }

    handleUChange(event) {
      this.state.formData.username = event.target.value;
    }
    handleEChange(event) {
      this.state.formData.email = event.target.value;
    }
    handlePChange(event) {
      this.state.formData.password = event.target.value;
    }
    handleLogout(event) {
      sessionStorage.clear();
      window.location.reload();
    }


    render() {
    return (
      <div>
      {sessionStorage.getItem("isLoggedIn") && sessionStorage.getItem("isAdmin") && <div>
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={'/'}>Quiz App</Link>
              </div>
              <ul className="nav navbar-nav">
              <div class="dropdown">
                <button class="dropbtn">Add Question</button>
                <div class="dropdown-content">
                 <Link to={'/NewQuestion'}>Add Question with Single answer</Link>
                 <Link to={'/NewMultiQuestion'}>Add Question with Multiple answers</Link>
                </div>
               </div>
               <div class="dropdown">
                 <button class="dropbtn">Delete Question</button>
                 <div class="dropdown-content">
                 <Link to={'/DeleteQuestion'}>Delete Question with Single answer</Link>
                 <Link to={'/DeleteMultiQuestion'}>Delete Question with Multiple answers</Link>
                 </div>
                </div>
                <div class="dropdown">
                  <button class="dropbtn">View Questions</button>
                  <div class="dropdown-content">
                  <Link to={'/ViewQuestions'}>View Questions with Single answer</Link>
                  <Link to={'/ViewMultiQuestions'}>View Questions with Multiple answers</Link>
                  </div>
                 </div>
                 <div class="dropdown">
                   <button class="dropbtn">Users</button>
                   <div class="dropdown-content">
                   <Link to={'/ViewUsers'}>View Users</Link>
                   <Link to={'/DeleteUser'}>Delete Users</Link>
                   </div>
                  </div>
              </ul>
              <ul className = "nav navbar-nav navbar-right">
                <li><Link to={'/'} onClick={this.handleLogout}>Logout</Link></li>
            </ul>
            </div>
           </nav>
          <Switch>
               <Route exact path='/' component={Home} />
               <Route exact path='/NewQuestion' component={NewQuestion} />
               <Route exact path='/NewMultiQuestion' component={NewMultiQuestion} />
               <Route exact path='/DeleteQuestion' component={DeleteQuestion} />
                <Route exact path='/DeleteMultiQuestion' component={DeleteMultiQuestion} />
               <Route exact path='/ViewQuestions' component={ViewQuestions} />
               <Route exact path='/ViewMultiQuestions' component={ViewMultiQuestions} />
               <Route exact path='/ViewUsers' component={ViewUsers} />
               <Route exact path='/DeleteUser' component={DeleteUser} />
               <Route exact path='/Sports' component={Sports} />
               <Route exact path='/Sports1' component={Sports1} />
               <Route exact path='/Sports2' component={Sports2} />
               <Route exact path='/SciTech' component={SciTech} />
               <Route exact path='/SciTech1' component={SciTech1} />
                <Route exact path='/SciTech2' component={SciTech2} />

          </Switch>

        </div>
      </Router> </div>}

      {!sessionStorage.getItem("isAdmin") && sessionStorage.getItem("isLoggedIn") && <div>
      <Router>
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to={'/'}>Quiz App</Link>
              </div>

              <ul className = "nav navbar-nav navbar-right">
                <li><Link to={'/'} onClick={this.handleLogout}>Logout</Link></li>
             </ul>
            </div>
           </nav>
          <Switch>
               <Route exact path='/' component={Home} />

          </Switch>

        </div>
      </Router> </div>}

      {!sessionStorage.getItem("isLoggedIn") && <div>
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
      <form>
        <h3>Welcome to the Quiz App!</h3>
        <h3> If you are new to this page, please Sign Up.</h3>
        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
        </div>
        <div className="form-group">
            <label>Email ID</label>
            <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
        </div>
        <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Sign Up</button>
        <button type="submit" className="btn btn-default" onClick={this.handleSignIn}>If already registered, Click here to Sign In </button>
      </form>

      </div>}
      </div>
    );
  }
}

export default App;
