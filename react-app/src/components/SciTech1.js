import React, { Component } from 'react';
import './DeleteQuestion.css';
var count = 0;
class SciTech1 extends Component {
      constructor() {
        super();
        this.state = {
          data: [],
          value: 0,
          formData: {
              ques: "",
              opt1: "",
              opt2: "",
              opt3: "",
              opt4: "",
              optcorrect: "",
              genre: "",
              ans: "",
          },
           submitted: false,
           correct: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
      }

      handleEnd (event) {
          event.preventDefault();
          window.alert("Your total score is: " + count)
          count = 0;
          window.location.reload();
      }
      handleSubmit (event) {
        event.preventDefault();


        fetch('http://localhost:8080/SciTech1', {
         method: 'POST',
         body: JSON.stringify(this.state.formData),

       })
          .then(response => {
              //console.log(response)
            if(response.status >= 200 && response.status < 300){
                this.setState({submitted: true});}
          });
          {
             const New = this.state.data.filter((item, key)=>{
                  return item.genre=='Sports'
              });
              const Correct = this.state.data.filter((item, key) =>{
                  if(this.state.formData.ans === item.optcorrect)
                    return 1;
                    else {
                        return 0;
                    }
              });
              const Check = Correct.length

              if(Check===1){
               count = count +10;
               alert("Correct Answer, " + "Your Score : " + count)


           }
               if(Check===0){
                alert("Wrong Answer, " + "Your Score : " + count)

            }
        }

      }

      handleChange(event) {
        this.state.formData.ans = event.target.value;
    }
      componentDidMount() {
        fetch('http://127.0.0.1:8080/SciTech1/',{
          method:'GET'
        })
          .then(response => response.json())
            .then(data => this.setState({data: data}));
      }

      render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Questions</h1>
            </header>
            <div className = "formContainer">
            <form onSubmit={this.handleSubmit}>
                <p>{this.state.data.map((item, key)=>{
                    if(item.genre=='Sci-Tech'){
                        return (
                        <p key = {key}>
                        <p>{item.ques}</p>
                        <p>{item.opt1}</p>
                        <p>{item.opt2}</p>
                        <p>{item.opt3}</p>
                        <p>{item.opt4}</p>
                        <input type="text" className="user-response" value={this.state.ans} onChange={this.handleChange}/>
                        <button type="submit" className="btn btn-default">Submit Answer</button>

                        </p>


                      )
                  }
                   })}
                </p>
                        <button onClick={this.handleEnd}>End Quiz</button>
            </form>
          </div>

        </div>
        );
      }
    }

export default SciTech1;
