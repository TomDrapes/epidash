import React, { Component } from 'react'
import Menu from '../components/dashboard/Menu'
import SideBar from '../components/dashboard/SideBar'
import PriceCompare from '../components/dashboard/PriceCompare'
import './style.css'

export default class DashBoard extends Component{

    render(){
        return(
            <div className='dashboard'>
                <Menu />
                <div className='dashboard-content'>
                    <SideBar />
                    <PriceCompare />                
                </div>
            </div>
        )
    }
}