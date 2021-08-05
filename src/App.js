import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3'
import TruffleContact from '@truffle/contract'

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


  handleSubmit = async (event) => {
      event.preventDefault()
      const data = this.state
      let web3Provider = null;

      if (window.ethereum) {
        web3Provider = window.ethereum
        try {
          // Request account access
          await window.ethereum.enable()
        } catch (error) {
          // User denied account access...
          console.error("User denied account access")
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        web3Provider = window.web3.currentProvider
      }
      // If no injected web3 instance is detected, fall back to Ganache
      else {
        web3Provider = new Web3.providers.HttpProvider('http://localhost:9545')
      }

      const getSurveyRewardContract = async () => {
        const response = await fetch("SurveyReward.json")
        const json = await response.json()
        const SurveyReward = TruffleContact(json)
        SurveyReward.setProvider(web3Provider)
        const contract = await SurveyReward.deployed()
        return contract
      }
      
      const getTokenContract = async () => {
        const response = await fetch("BouncebackTestToken.json")
        const json = await response.json()
        const SurveyReward = TruffleContact(json)
        SurveyReward.setProvider(web3Provider)
        const contract = await SurveyReward.deployed()
        return contract
      }
      
      const rewarder = await getSurveyRewardContract()
      const token = await getTokenContract()
      const surveyId = "0x63796470567535644e5473766f6755425446774e6f69"
      const web3 = new Web3(App.web3Provider);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];      

      await rewarder.addSurveySubmission(surveyId, JSON.stringify(data), {from: account})
      alert("Thank you. You'll receive your rewards soon.")

      console.log(await token.balanceOf(account))
      
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
