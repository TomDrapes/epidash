import React, { Component } from 'react'
import './style.css'

export default class SideBar extends Component {
  constructor(props){
    super(props)

    this.state ={
      menuItems: [
        {priceCompare: true},
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
    this.setState({ menuItems: updatedMenu })
  }

  render(){

    let priceCompare = this.state.menuItems[0].priceCompare ? "selected" : undefined
    let suggestions = this.state.menuItems[1].suggestions? "selected" : undefined
    let competition = this.state.menuItems[2].competition ? "selected" : undefined
    let inventory = this.state.menuItems[3].inventory ? "selected" : undefined
    let accountDetails = this.state.menuItems[4].accountDetails ? "selected" : undefined

    return(
      <div className='sidebar-container'>
        <ul>
          <li className={priceCompare} onClick={() => this.updateSelected('priceCompare')}><i className="fas fa-search-dollar"></i>PRICE COMPARE</li>
          <li className={suggestions} onClick={() => this.updateSelected('suggestions')}><i class="far fa-lightbulb"></i>SUGGESTIONS</li>
          <li className={competition} onClick={() => this.updateSelected('competition')}><i class="fas fa-users"></i>COMPETITION</li>
          <li className={inventory} onClick={() => this.updateSelected('inventory')}><i class="fas fa-warehouse"></i>INVENTORY</li>
          <li className={accountDetails} onClick={() => this.updateSelected('accountDetails')}><i class="fas fa-chart-bar"></i>ACCOUNT DETAILS</li>
        </ul>

      </div>
    )
  }
}
