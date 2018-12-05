import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteUser extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      value: 0
    }
    this.Click = this.Click.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  Click(event){
    console.log(event.target.value);
    this.setState({value:event.target.value});
  }

  Submit (event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8080/users/'+this.state.value, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        window.location.reload();
      });
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8080/users/',{
      method:'get'
    })
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a User</h1>
        </header>
        <form onSubmit={this.Submit}>
          <table className="table-hover">
            <thead>
              <tr>
                    <th>User_ID</th>
                    <th>Username</th>
                    <th>MailID</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key)=>{
                 return (
                    <tr key = {key}>

                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                        <input type="radio" value={item.id} name="radio" onClick={this.Click}/>
                    </tr>
                  )
               })}
            </tbody>
          </table>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

export default DeleteUser;
