import React, { Component } from 'react'
import './menu.css'

export default class Menu extends Component {

    constructor(props){
        super(props)

        this.state = {
            menuItems: [
                {priceCompare: true},
                {suggestions: false},
                {competition: false},
                {inventory: false},
                {taxRecords: false},
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
        let taxRecords = this.state.menuItems[4].taxRecords ? "selected" : undefined

        return(
            <div className="menu-container">
                <img className='logo' src={require("../../images/hawk_logo.png")} alt='logo' />
                <ul className="menu-items">
                    <li className={priceCompare} onClick={() => this.updateSelected('priceCompare')}>Price Compare</li>
                    <li className={suggestions} onClick={() => this.updateSelected('suggestions')}>Suggestions</li>
                    <li className={competition} onClick={() => this.updateSelected('competition')}>Competition</li>
                    <li className={inventory} onClick={() => this.updateSelected('inventory')}>Inventory</li>
                    <li className={taxRecords} onClick={() => this.updateSelected('taxRecords')}>Tax Records</li>
                </ul>
            </div>
        )
    }
}