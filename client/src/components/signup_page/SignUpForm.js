import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './style.css'

export default class SignUpForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            status: '',
            email: '',
            password: '',
            loading: false,
            redirect: ''
        }

    }

    onTextboxChangeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    onTextboxChangePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    onSignUp(e) {
        e.preventDefault()
        console.log("signup")
        let newUser = {
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

    render(){
        const { email, password, redirect } = this.state

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
                        <h4>USERNAME</h4>
                        <i className="fas fa-user"></i>
                        <input 
                            type='email' 
                            placeholder='Email'
                            value={email}
                            onChange={this.onTextboxChangeEmail}
                        /><br/>
                        <h4>PASSWORD</h4>
                        <i className="fas fa-lock"></i>
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