import React, { Component } from 'react';
import './NewQuestion.css';

class NewMultiQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        ques: "",
        opt1: "",
        opt2: "",
        opt3: "",
        opt4: "",
        isopt1: false,
        isopt2: false,
        isopt3: false,
        isopt4: false,
        genre: "",
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handle4Change = this.handle4Change.bind(this);
    this.handleis1Change = this.handleis1Change.bind(this);
    this.handleis2Change = this.handleis2Change.bind(this);
    this.handleis3Change = this.handleis3Change.bind(this);
    this.handleis4Change = this.handleis4Change.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/multiquestions', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          window.location.reload();
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
  handleis1Change(event) {
    this.state.formData.isopt1 = event.target.checked;
    console.log(event.target.checked)
    console.log(this.state.formData.isopt1)
  }
  handleis2Change(event) {
    this.state.formData.isopt2 = event.target.checked;
    console.log(event.target.checked)
  }
  handleis3Change(event) {
    this.state.formData.isopt3 = event.target.checked;
    console.log(event.target.checked)
  }
  handleis4Change(event) {
    this.state.formData.isopt4 = event.target.checked;
    console.log(event.target.checked)
  }
  handleGenreChange(event) {
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
          <form>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.ques} onChange={this.handleQChange}/>
            </div>

                <label>Option 1</label>
                <div className="form-inline">
                <input type="text" className="form-control" value={this.state.opt1} onChange={this.handle1Change}/>
                <input type="checkbox" value={this.state.isopt1} name="radio1" onClick={this.handleis1Change}/>
            </div>

                <label>Option 2</label>
                    <div className="form-inline">
                <input type="text" className="form-control" value={this.state.opt2} onChange={this.handle2Change}/>
                <input type="checkbox" value={this.state.isopt2} name="radio2" onClick={this.handleis2Change}/>
            </div>

                <label>Option 3</label>
                <div className="form-inline">
                <input type="text" className="form-control" value={this.state.opt3} onChange={this.handle3Change}/>
                <input type="checkbox" value={this.state.isopt3} name="radio3" onClick={this.handleis3Change}/>
            </div>

                <label>Option 4</label>
                <div className="form-inline">
                <input type="text" className="form-control" value={this.state.opt4} onChange={this.handle4Change}/>
                    <input type="checkbox" value={this.state.isopt4} name="radio4" onClick={this.handleis4Change}/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGenreChange}/>
            </div>
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewMultiQuestion;
