import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component{

    render(){
        return (
            <div>
                <h1>EpiDash</h1>
                <p>Work in progress</p>
                <ul>
                    <li><Link to={`/login`}>Login</Link></li>
                </ul>
            </div>
        )
    }
}