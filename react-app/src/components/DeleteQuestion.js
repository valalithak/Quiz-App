import React, { Component } from 'react';
import './DeleteQuestion.css';

class DeleteQuestion extends Component {
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
    fetch('http://127.0.0.1:8080/questions/'+this.state.value, {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
        window.location.reload();
      });
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8080/questions/',{
      method:'get'
    })
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Question</h1>
        </header>
        <form onSubmit={this.Submit}>
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Question</th>
                <th>Option1</th>
                <th>Option2</th>
                <th>Option3</th>
                <th>Option4</th>
                <th>Correct_Answer</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map((item, key)=>{
                 return (
                    <tr key = {key}>
                    <td>{item.id}</td>
                    <td>{item.ques}</td>
                    <td>{item.opt1}</td>
                    <td>{item.opt2}</td>
                    <td>{item.opt3}</td>
                    <td>{item.opt4}</td>
                    <td>{item.optcorrect}</td>
                    <td>{item.genre}</td>
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

export default DeleteQuestion;
