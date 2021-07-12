import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          myFullName: '',
          age: '',
          DOB: '',
          phone:'',
          address:'',
          favourite_tv_show:'',
          favourite_celeb:''
      }

  }


  handleSubmit = (event) => {
      event.preventDefault()
      const data = this.state
      // console.log(this.inputFullNameRef.current.value)
      console.log("Final data is", data)
  }

  handleInputChange = (event) => {
      event.preventDefault()
     // console.log(event)
     // console.log(event.target.name)
     // console.log(event.target.value)
     this.setState({
         [event.target.name]: event.target.value
     })
  }


  // componentDidMount(){
  //     this.inputFullNameRef.current.focus()
  // }
render () {
    const {myFullName} = this.state
    const {email} = this.state
  return (
    <div>
      <h1>Survey</h1>
      <p>Enter name : {myFullName}</p>
      <form onSubmit={this.handleSubmit}>
      <input
        type='text'
        name='myFullName'
        required
        onChange={this.handleInputChange}
      />
       <p>Enter Age :</p>
      <input
        type='number'
        name='age'
        required
        onChange={this.handleInputChange}
      />
      <p>Enter DOB :</p>
      <input
        type='date'
        name='DOB'
        required
        onChange={this.handleInputChange}
      />
      <p>Enter Phone number :</p>
      <input
        type='tel'
        name='phone'
        required
        onChange={this.handleInputChange}
      />
      <p>Enter Address :</p>
      <input
        type='text'
        name='address'
        required
        onChange={this.handleInputChange}
      />
      <p>Enter Favourite tv show :</p>
      <textarea
        type='text'
        name='favourite_tv_show'
        onChange={this.handleInputChange}
      />
      <p>Enter Favourite celebrity :</p>
      <textarea
        type='text'
        name='favourite_celeb'
        onChange={this.handleInputChange}
      />
        <p><button>Submit</button></p>

      </form>
    </div>
  )
}
}

export default App;
