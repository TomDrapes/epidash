import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setInStorage, getFromStorage } from '../utils/storage';
import axios from 'axios';


export default class LoginPage extends Component{
    constructor(props){
        super(props)

        this.state = {
            title: 'SIGN IN',
            isLoading: false,
            token: '',
            signUpError: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            signUpEmail: '',
            signUpPassword: '',
            redirect: false
        }
    }

    onTextboxChangeSignInEmail =(event) => {
        this.setState({
            signInEmail: event.target.value,
        });
    }
    
    onTextboxChangeSignInPassword = (event) => {
         this.setState({
            signInPassword: event.target.value,
        });
    }

    onTextboxChangeSignUpEmail = (event) => {
        this.setState({
            signUpEmail: event.target.value,
        });
    }

    onTextboxChangeSignInEmail = (event) => {
        this.setState({
            signInEmail: event.target.value,
        });
    }

    onTextboxChangeSignUpPassword = (event) => {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

    onSignUp() {
       let newUser = {
           email: this.state.signUpEmail,
           password: this.state.signUpPassword
       }

       this.setState({ isLoading: true })

       axios.post('/api/account/signup', newUser)
        .then(res => {
            console.log(res)
            if(res.data.success){
                this.setState({
                    signUpError: res.data.message,
                    isLoading: false,
                    signUpEmail: '',
                    signUpPassword: ''
                })
            } else {
                this.setState({
                    signUpError: res.data.message,
                    isLoading: false
                })
            }
        }).catch(err => console.log(err))
    }

    onSignIn() {
        let user = {
            email: this.state.signInEmail,
            password: this.state.signInPassword,
        }
        this.setState({ isLoading: true })

        axios.post('/api/account/signin', user)
         .then(res => {
             console.log(res)
             if(res.data.success){
                 setInStorage('epi_token', { token: res.data.token })
                 this.setState({
                     signInError: res.data.message,
                     isLoading: false,
                     signInPassword: '',
                     signInEmail: '',
                     token: res.data.token,
                     redirect: true
                 })
             } else {
                 this.setState({
                     signInError: res.data.message,
                     isLoading: false
                 })
             }
         })
         .catch(err => console.log(err))
    }

    //This clears the token from local storage and tells the backend to 'delete' the user session
    logout() {
       this.setState({ isLoading: true })
       const obj = getFromStorage('epi_token')
       if (obj && obj.token) {
           const { token } = obj;
           axios.get('/api/account/logout?token=' + token)
            .then(res => {
                if (res.data.success) {
                    console.log('logout success')
                    localStorage.removeItem('epi_token')
                    this.setState({
                        token: '',
                        isLoading: false
                    })
                } else {
                    console.log('logout unsuccessful')
                    this.setState({
                        isLoading: false,
                    })
                }
            })
       } else {
           this.setState({ isLoading: false })
       }
    }

    inputFields() {
        const { signInEmail, signInPassword, signUpEmail, signUpPassword } = this.state;
        if(this.state.title === 'SIGN IN'){
            return (
                <div>
                    <h4>USERNAME</h4>
                    <i className="fas fa-user"></i>
                    <input 
                        type='email' 
                        placeholder='Email'
                        value={signInEmail}
                        onChange={this.onTextboxChangeSignInEmail}
                    /><br/>
                    <h4>PASSWORD</h4>
                    <i className="fas fa-lock"></i>
                    <input 
                        type='password' 
                        placeholder='Password'
                        value={signInPassword}
                        onChange={this.onTextboxChangeSignInPassword} 
                    /><br/>
                    <p style={{color: 'red'}}>{this.state.signInError}</p>
                    <button onClick={() => this.onSignIn()}>SIGN IN</button>
                </div>
            )
        }
        return (
            <div>
                <h4>USERNAME</h4>
                <i className="fas fa-user"></i>
                <input 
                    type='email' 
                    placeholder='Email'
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                /><br/>
                <h4>PASSWORD</h4>
                <i className="fas fa-lock"></i>
                <input 
                    type='password' 
                    placeholder='Password'
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword} 
                /><br/>
                <p style={{color: 'red'}}>{this.state.signUpError}</p>
                <button onClick={() => this.onSignUp()}>SIGN UP</button>
            </div>
        )
    }

    componentDidMount() {
        const obj = getFromStorage('epi_token')
        if (obj && obj.token){
            const { token } = obj
            //Verify token
            axios.get('/api/account/verify?token' + token)
                .then(res => {
                    if (res.success){
                        this.setState({
                            token,
                            isLoading: false
                        })
                    } else {
                        this.setState({ isLoading: false })
                    }
                })
        } else{
            this.setState({ isLoading: false })
        }
    }

    render(){
        if(this.state.redirect){
            return ( <Redirect push to={`/dashboard`} /> )
        }
        const { isLoading, token } = this.state;
        
        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        if (!token) {
            return (
                <div className='login-page'>
                    <div className='login-container'>
                        <h1>EpiDash</h1>
                        <h2>{this.state.title}</h2>
                            <form>
                                {this.inputFields()}
                            </form>
                            <div className='remember-forgot-container'>
                                <div className='remember-me'>
                                    <input type='checkbox' />Remember me
                                </div>
                                <div className='forgot-password'>
                                    <a href="/">I forgot my password</a>
                                </div>
                            </div>
                        
                        <div>

                            <hr />
                            {this.state.title === "SIGN IN" ? 
                                <div className="signInOrUp" onClick={() => this.setState({ title: "SIGN UP"})}>Not a member yet? <a>JOIN</a></div>
                                :
                                <div className="signInOrUp" onClick={() => this.setState({ title: "SIGN IN"})}><a>SIGN IN</a></div>
                            }
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div>
              <p>Account</p>
              <button onClick={() => this.logout()}>Logout</button>
            </div>
        );
    }
}
