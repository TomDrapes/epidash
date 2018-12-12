import React, { Component } from 'react'
import './style.css'

export default class Menu extends Component {

    constructor(props){
        super(props)

        this.state = {}

    }



    render(){
        return(
            <div className='top-bar-container'>
                <i className="fas fa-bars top-bar-hamburger-menu" onClick={() => this.props.toggleSideBar()}></i>
                <div className='top-bar-title'>EpiDash</div>
                <i className="far fa-bell top-bar-notifications"></i>
                <i className="fas fa-cog top-bar-settings-menu"></i>
            </div>
        )
    }
}
