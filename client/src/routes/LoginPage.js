import React, { Component } from 'react'
import LoginForm from '../components/login_page/LoginForm'

export default class LoginPage extends Component {

    render(){
        return(
            <div className='login-page'>
                <LoginForm />
            </div>
        )
    }
}