import React, { Component } from 'react'
import Menu from '../components/dashboard/Menu'
import SideBar from '../components/dashboard/SideBar'
import PriceCompare from '../components/dashboard/PriceCompare'
import './style.css'

export default class DashBoard extends Component{
    constructor(props){
        super(props)

        this.state = {
            showSideBar: true
        }
    }

    toggleSideBar = () => {
        this.setState({ showSideBar: !this.state.showSideBar })
    }

    render(){
        return(
            <div className='dashboard'>
                <Menu toggleSideBar={this.toggleSideBar}/>
                <div className='dashboard-content'>
                    {this.state.showSideBar && <SideBar />}
                    <PriceCompare />                
                </div>
            </div>
        )
    }
}