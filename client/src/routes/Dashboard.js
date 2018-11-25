import React, { Component } from 'react'
import Menu from '../components/menu/Menu'
import SideBar from '../components/side_bar/SideBar'
import PriceCompare from '../components/price_compare/PriceCompare'
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