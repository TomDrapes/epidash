import React, { Component } from 'react'

export default class LoginPage extends Component{
    constructor(props){
        super(props)

        this.state = {
          title: 'SIGN IN'
        }
    }

    render(){
        return (
            <div className='login-page'>
                <div className='login-container'>
                    <h1>EpiDash</h1>
                    <h2>{this.state.title}</h2>
                    <form>
                        <h2>USERNAME</h2>
                        <i class="fas fa-user"></i>
                        <input type='text' placeholder='Username/Email'></input><br/>
                        <h2>PASSWORD</h2>
                        <i class="fas fa-lock"></i>
                        <input type='text' placeholder='Password' /><br />
                        <div className='remember-forgot-container'>
                            <div className='remember-me'>
                                <input type='checkbox' />Remember me
                            </div>
                            <div className='forgot-password'>
                                <a href="/">I forgot my password</a>
                            </div>
                        </div>
                    </form>
                    <div>

                        <hr />
                        <p>Not a member yet? <p onClick={() => this.setState({ title: "SIGN UP"})}>JOIN</p></p>
                    </div>
                </div>
            </div>
        )
    }
}
