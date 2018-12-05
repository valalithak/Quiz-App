import React, { Component } from 'react';
import './DeleteQuestion.css';
var count = 0;
class SciTech2 extends Component {
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
              isopt1 : false,
              isopt2 : false,
              isopt3 : false,
              isopt4 : false,
              genre: "",
              correct1: true,
              correct2: true,
              correct3: true,
              correct4: true,
             },
           submitted: false,

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handle1Change = this.handle1Change.bind(this);
        this.handle2Change = this.handle2Change.bind(this);
        this.handle3Change = this.handle3Change.bind(this);
        this.handle4Change = this.handle4Change.bind(this);
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

        this.setState({value:event.target.value});
        console.log(this.state.formData.correct1);
        console.log(this.state.formData.correct2);
        console.log(this.state.formData.correct3);
        console.log(this.state.formData.correct4);

        if(this.state.formData.correct1 === true && this.state.formData.correct2 === true && this.state.formData.correct3 === true && this.state.formData.correct4 === true)
       {
           count = count + 10;
           alert("Correct Answer, your score is: " + count);

       }
       else{
          alert("Wrong Answer, your score is: " + count);
    }
      this.state.formData.correct1 = true
      this.state.formData.correct2 = true
      this.state.formData.correct3 = true
      this.state.formData.correct4 = true

    }

     handle1Change(event) {
         var flag = 0;
         const New = this.state.data.filter((item, key)=>{
              return item.genre=='Sci-Tech'

     });
       console.log(New);
        const Ans = this.state.data.filter((item, key)=>{
          if(item.id===11)
                flag = 0;
          if(item.id===12)
                flag = 1;
          if(item.id===13)
                flag = 2;
          if(item.id===14)
                flag = 3;
          if(item.id===15)
                flag = 4;

      });
        this.state.formData.isopt1 = event.target.checked;

        if(this.state.formData.isopt1 === New[flag].isopt1)
            this.state.formData.correct1 = true;
        else
            this.state.formData.correct1 = false;

        }

    handle2Change(event) {
        var flag = 0;
        const New = this.state.data.filter((item, key)=>{
             return item.genre=='Sci-Tech'

        });
        const Ans = this.state.data.filter((item, key)=>{
          if(item.id===11)
                flag = 0;
          if(item.id===12)
                flag = 1;
          if(item.id===13)
                flag = 2;
          if(item.id===14)
                flag = 3;
          if(item.id===15)
                flag = 4;

      });
      this.state.formData.isopt2 = event.target.checked;

      if(this.state.formData.isopt2 === New[flag].isopt2)
          this.state.formData.correct2 = true;
      else
          this.state.formData.correct2 = false;
    }
    handle3Change(event) {
        var flag = 0;
        const New = this.state.data.filter((item, key)=>{
             return item.genre=='Sci-Tech'
        });
        const Ans = this.state.data.filter((item, key)=>{
          if(item.id===11)
                flag = 0;
          if(item.id===12)
                flag = 1;
          if(item.id===13)
                flag = 2;
          if(item.id===14)
                flag = 3;
          if(item.id===15)
                flag = 4;

      });
      this.state.formData.isopt3 = event.target.checked;

      if(this.state.formData.isopt3 === New[flag].isopt3)
          this.state.formData.correct3 = true;
      else
          this.state.formData.correct3 = false;
    }
    handle4Change(event) {
        var flag = 0;
        const New = this.state.data.filter((item, key)=>{
             return item.genre=='Sci-Tech'

        });
        const Ans = this.state.data.filter((item, key)=>{
          if(item.id===11)
                flag = 0;
          if(item.id===12)
                flag = 1;
          if(item.id===13)
                flag = 2;
          if(item.id===14)
                flag = 3;
          if(item.id===15)
                flag = 4;

      });
      this.state.formData.isopt4 = event.target.checked;

      if(this.state.formData.isopt4 === New[flag].isopt4)
          this.state.formData.correct4 = true;
      else
          this.state.formData.correct4 = false;
}
      componentDidMount() {
        fetch('http://127.0.0.1:8080/SciTech2/',{
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
            <form>
                <p>{this.state.data.map((item, key)=>{
                    if(item.genre=='Sci-Tech'){
                        return (
                        <p key = {key}>
                        <p>{item.ques}</p>
                        <div className="form-inline">
                        <p>{item.opt1}</p>
                        <input type="checkbox" value={this.state.isopt1} name="radio1" onClick={this.handle1Change}/>
                        </div>
                        <div className="form-inline">
                        <p>{item.opt2}</p>
                        <input type="checkbox" value={this.state.isopt2} name="radio2" onClick={this.handle2Change}/>
                        </div>
                        <div className="form-inline">
                        <p>{item.opt3}</p>
                        <input type="checkbox" value={this.state.isopt3} name="radio3" onClick={this.handle3Change}/>
                        </div>
                        <div className="form-inline">
                        <p>{item.opt4}</p>
                        <input type="checkbox" value={this.state.isopt4} name="radio4" onClick={this.handle4Change}/>
                        </div>
                        <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
                        </p>
                      )
                  }
                   })}
                </p>

            </form>
          </div>

        </div>
        );
      }
    }

export default SciTech2;
