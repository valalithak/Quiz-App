import React, { Component } from 'react';
import './ViewQuestions.css';


  class ViewMultiQuestions extends Component {
    constructor() {
      super();
      this.state = {
        data: [],

      }
    }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/multiquestions/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Genre</th>
              <th>Question</th>
              <th>Option1</th>
              <th>Option2</th>
              <th>Option3</th>
              <th>Option4</th>

            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
                console.log(item.genre)
                console.log(item.ques)
                console.log(item.opt1)
                console.log(item.opt2)
                console.log(item.opt3)
                console.log(item.opt4)
                console.log(item.isopt1)
                console.log(item.isopt2)
                console.log(item.isopt3)
                console.log(item.isopt4)

               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.genre}</td>
                      <td>{item.ques}</td>
                      <td>{item.opt1}</td>
                      <td>{item.opt2}</td>
                      <td>{item.opt3}</td>
                      <td>{item.opt4}</td>

                     </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewMultiQuestions;
