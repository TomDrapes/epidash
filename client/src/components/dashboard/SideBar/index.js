import React, { Component } from 'react'
import './style.scss'

export default class SideBar extends Component {
  constructor(props){
    super(props)

    this.state ={
      menuItems: [
        {priceCompare: true},
        {shortList: false},
        {suggestions: false},
        {competition: false},
        {inventory: false},
        {accountDetails: false},
      ]
    }
  }

  updateSelected(menuItem){
    let updatedMenu = this.state.menuItems.map(item => {
        if (menuItem in item){
            return { [Object.keys(item)[0]] : true }
        }
        return { [Object.keys(item)[0]]: false}
    })
    this.props.toggleComponent(menuItem)
    this.setState({ menuItems: updatedMenu })
  }

  render(){

    let priceCompare = this.state.menuItems[0].priceCompare ? "selected" : undefined
    let shortList = this.state.menuItems[1].shortList ? "selected" : undefined
    let suggestions = this.state.menuItems[2].suggestions? "selected" : undefined
    let competition = this.state.menuItems[3].competition ? "selected" : undefined
    let inventory = this.state.menuItems[4].inventory ? "selected" : undefined
    let accountDetails = this.state.menuItems[5].accountDetails ? "selected" : undefined

    return(
      <div className='sidebar-container'>
        <ul>
          <li className={priceCompare} onClick={() => this.updateSelected('priceCompare')}><i className="fas fa-search-dollar"></i>PRICE COMPARE</li>
          <li className={shortList} onClick={() => this.updateSelected('shortList')}><i className="fas fa-clipboard-list"></i>SHORT LIST</li>
          <li className={suggestions} onClick={() => this.updateSelected('suggestions')}><i className="far fa-lightbulb"></i>SUGGESTIONS</li>
          <li className={competition} onClick={() => this.updateSelected('competition')}><i className="fas fa-users"></i>COMPETITION</li>
          <li className={inventory} onClick={() => this.updateSelected('inventory')}><i className="fas fa-warehouse"></i>INVENTORY</li>
          <li className={accountDetails} onClick={() => this.updateSelected('accountDetails')}><i className="fas fa-chart-bar"></i>ACCOUNT DETAILS</li>
        </ul>

      </div>
    )
  }
}
