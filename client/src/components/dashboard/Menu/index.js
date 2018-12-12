import React, { Component } from 'react'
import './style.css'

export default class Menu extends Component {

    constructor(props){
        super(props)

        this.state = {}

    }



    render(){
        return(
            <div className="menu-container">
              <i className="fas fa-bars hamburger-menu" onClick={() => this.props.toggleSideBar()}></i>
              <div className='title'>EpiDash</div>
              <i className="fas fa-cog settings-menu"></i>
              <i className="far fa-bell notifications"></i>
              <div className='clear' />
            </div>
        )
    }
}
