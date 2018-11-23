import React, { Component } from 'react'
import Menu from '../components/menu/Menu'
import SideBar from '../components/side_bar/SideBar'
import PriceCompare from '../components/price_compare/PriceCompare'

export default class DashBoard extends Component{

    render(){
        return(
            <div>
                <Menu />
                <SideBar />
                <PriceCompare />
            </div>
        )
    }
}