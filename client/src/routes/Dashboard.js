import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Menu from '../components/dashboard/Menu'
import SideBar from '../components/dashboard/SideBar'
import PriceCompare from '../components/dashboard/PriceCompare'
import ShortList from '../components/dashboard/ShortList'
import StoreEditor from '../components/dashboard/StoreEditor'
import './style.scss'

export default class DashBoard extends Component{
    constructor(props){
        super(props)

        this.state = {
            showSideBar: true,
            selectedComponent: 'priceCompare'
        }
    }

    toggleSideBar = () => {
        this.setState({ showSideBar: !this.state.showSideBar })
    }

    toggleComponent = (selectedComponent) => {
        this.setState({ selectedComponent })
    }

    selectedComponent(){
        switch(this.state.selectedComponent) {
            case 'priceCompare': return <PriceCompare userId={this.props.location.state.userId} />
            case 'shortList': return <ShortList userId={this.props.location.state.userId} />
            case 'storeEditor': return <StoreEditor userId={this.props.location.state.userId} />
            default: return <PriceCompare userId={this.props.location.state.userId} />
        }
    }

    render(){
        
        return(
            <div className='dashboard'>
                <Menu toggleSideBar={this.toggleSideBar}/>
                <div className='dashboard-content'>
                    
                    <ReactCSSTransitionGroup
                        transitionName='dashboard-sidebar-transition'
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={700}
                    >
                        {this.state.showSideBar && <SideBar toggleComponent={this.toggleComponent} key={'sidebar-component'}/>}
                    </ReactCSSTransitionGroup>
                    
                    {this.selectedComponent()}               
                </div>
            </div>
        )
    }
}