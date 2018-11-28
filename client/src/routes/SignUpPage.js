import React, { Component } from 'react';
import SignUpForm from '../components/signup_page/SignUpForm'


export default class SignUpPage extends Component{

    render(){
        return (
            <div className='signup-page'>
               <SignUpForm />
            </div>
        )
    }
}
