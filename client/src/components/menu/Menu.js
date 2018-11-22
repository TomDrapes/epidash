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
              <i className="fas fa-bars hamburger-menu"></i>
              <div className='title'>EpiDash</div>
              <i className="fas fa-cog settings-menu"></i>
              <div className='clear' />
            </div>
        )
    }
}
