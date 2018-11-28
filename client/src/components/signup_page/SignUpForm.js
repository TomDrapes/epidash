import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { getNameList, getCode } from 'country-list'
import './style.css'

export default class SignUpForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            status: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            loading: false,
            redirect: '',
            countries: getNameList(),
            selectedCountry: 'afghanistan',
        }
    }

    onTextboxChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    onTextboxChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    onTextboxChangeFirstName = (event) => {
        this.setState({ firstName: event.target.value })
    }

    onTextboxChangeLastName = (event) => {
        this.setState({ lastName: event.target.value })
    }

    onChangeDropdown = (event) => {
        this.setState({ selectedCountry: event.target.value })
    }

    onSignUp(e) {
        e.preventDefault()
        console.log("signup")
        let newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.selectedCountry,
            email: this.state.email,
            password: this.state.password
        }
 
        this.setState({ loading: true })
 
        axios.post('/api/account/signup', newUser)
         .then(res => {
             console.log(res)
             if(res.data.success){
                 this.setState({
                     status: res.data.message,
                     loading: false,
                     email: '',
                     password: ''
                 })
             } else {
                 this.setState({
                     status: res.data.message,
                     loading: false
                 })
             }
         }).catch(err => console.log(err))
     }

    countryList = () => {
        let countries = Object.keys(this.state.countries)
        let list = countries.map(country => {
            return (
                <option value={country}>{country}</option>
            )
        })
        return list
    }

    render(){
        const { email, password, redirect, firstName, lastName, toggleCountryList } = this.state

        switch(redirect){
            case 'SIGN_IN': return ( <Redirect push to={'/login'} />)
            default: break;
        }

        return (
            <div className='signup-form-container'>
                <h1>EpiDash</h1>
                <h2>SIGN UP</h2>
                <form onSubmit={(e) => this.onSignUp(e)}>
                    <div>
                        <h4>FIRST NAME</h4>
                        <input
                            type='text'
                            placeholder='First name'
                            value={firstName}
                            onChange={this.onTextboxChangeFirstName}
                        /><br/>
                        <h4>LAST NAME</h4>
                        <input
                            type='text'
                            placeholder='Last name'
                            value={lastName}
                            onChange={this.onTextboxChangeLastName}
                        /><br/>
                        <h4>COUNTRY</h4>
                        <div className='country-dropdown-container'>
                            <select className='country-list' onChange={this.onChangeDropdown} size='3'>
                                {this.countryList()}
                            </select>
                        </div>
                        <h4>EMAIL</h4>

                        <input 
                            type='email' 
                            placeholder='Email'
                            value={email}
                            onChange={this.onTextboxChangeEmail}
                        /><br/>
                        <h4>PASSWORD</h4>
                        <input 
                            type='password' 
                            placeholder='Password'
                            value={password}
                            onChange={this.onTextboxChangePassword} 
                        /><br/>
                        <p style={{color: 'red'}}>{this.state.status}</p>
                        <button type='submit'>SIGN UP</button>
                    </div>
                </form>
                <hr />        
                <div className="signInText" onClick={() => this.setState({ redirect: "SIGN_IN"})}>SIGN IN</div>
            </div>
        )
    }
}