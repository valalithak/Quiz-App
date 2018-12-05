import React, { Component } from 'react';
import './NewQuestion.css';

class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        ques: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        optcorrect: "",
        genre: "",
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handle4Change = this.handle4Change.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/questions', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleQChange(event) {
    this.state.formData.ques = event.target.value;
  }
  handle1Change(event) {
    this.state.formData.opt1 = event.target.value;
  }
  handle2Change(event) {
    this.state.formData.opt2 = event.target.value;
  }
  handle3Change(event) {
    this.state.formData.opt3 = event.target.value;
  }
  handle4Change(event) {
    this.state.formData.opt4 = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.optcorrect = event.target.value;
  }
  handleGChange(event) {
    this.state.formData.genre = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.ques} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Option 1</label>
                <input type="text" className="form-control" value={this.state.opt1} onChange={this.handle1Change}/>
            </div>
            <div className="form-group">
                <label>Option 2</label>
                <input type="text" className="form-control" value={this.state.opt2} onChange={this.handle2Change}/>
            </div>
            <div className="form-group">
                <label>Option 3</label>
                <input type="text" className="form-control" value={this.state.opt3} onChange={this.handle3Change}/>
            </div>
            <div className="form-group">
                <label>Option 4</label>
                <input type="text" className="form-control" value={this.state.opt4} onChange={this.handle4Change}/>
            </div>
            <div className="form-group">
                <label>Correct Answer</label>
                <input type="text" className="form-control" value={this.state.optcorrect} onChange={this.handleCChange}/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        
      </div>
    );
  }
}

export default NewQuestion;
