import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setInStorage, getFromStorage } from '../../utils/storage';
import axios from 'axios';
import './style.css'


export default class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            loading: false,
            token: '',
            status: '',
            email: '',
            password: '',
            redirect: '',
            userId: ''
        }
    }

    onTextboxChangeEmail =(event) => {
        this.setState({
            email: event.target.value,
        });
    }
    
    onTextboxChangePassword = (event) => {
         this.setState({
            password: event.target.value,
        });
    }
    

    onSignIn(e) {
        e.preventDefault()
        let user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({ loading: true })

        axios.post('/api/account/signin', user)
         .then(res => {
             console.log(res)
             if(res.data.success){
                 setInStorage('epi_token', { token: res.data.token })
                 this.setState({
                     status: res.data.message,
                     loading: false,
                     password: '',
                     email: '',
                     token: res.data.token,
                     redirect: 'DASHBOARD',
                     userId: res.data.userId
                 })
             } else {
                 this.setState({
                     status: res.data.message,
                     loading: false
                 })
             }
         })
         .catch(err => console.log(err))
    }

    //This clears the token from local storage and tells the backend to 'delete' the user session
    logout() {
       this.setState({ loading: true })
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
                        loading: false
                    })
                } else {
                    console.log('logout unsuccessful')
                    this.setState({
                        loading: false,
                    })
                }
            })
       } else {
           this.setState({ loading: false })
       }
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
                            loading: false
                        })
                    } else {
                        this.setState({ loading: false })
                    }
                })
        } else{
            this.setState({ loading: false })
        }
    }

    render(){
        const { loading, token, redirect, status, email, password, userId } = this.state;

        switch(redirect){
            case "SIGN_UP": return ( <Redirect push to={'/signup'} />);
            case "DASHBOARD": return ( <Redirect push to={`/dashboard/${userId}`} />)
            default: break;
        }
        
        if (loading) {
            return (<div><p>Loading...</p></div>);
        }

        if (!token) {
            return (
                <div className='login-container'>
                    <h1>EpiDash</h1>
                    <h2>SIGN IN</h2>
                    <form onSubmit={(e) => this.onSignIn(e)}>
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
                            <p style={{color: 'red'}}>{status}</p>
                            <button>SIGN IN</button>
                        </div>
                    </form>
                    
                    <div className='remember-forgot-container'>
                        <div className='remember-me'>
                            <input type='checkbox' />Remember me
                        </div>
                        <div className='forgot-password'>
                            <a href="/">I forgot my password</a>
                        </div>
                    </div>
                    
                    <hr />        
                    <div className="signUpText" onClick={() => this.setState({ redirect: "SIGN_UP"})}>Not a member yet? JOIN</div>  
                </div>      
            )
        }
    }
}
