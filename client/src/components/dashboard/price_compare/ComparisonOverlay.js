import React, { Component } from 'react'
import ComparisonOverlayListItem from './ComparisonOverlayListItem'
import './style.css'

export default class ComparisonOverlay extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: this.props.items,
        }
    }

    items = () => {
        let items = this.state.items.map(item => {
            return (
                <ComparisonOverlayListItem item={item} addMatch={() => this.props.addMatch(item)}/>
            )
        })
        return items
    }
        
    render() {
        return(
            <div className='comparison-selection-container'>
                <div className='comparison-selection-component-heading-tab'>
                    <h1>SELECT ALL MATCHING PRODUCTS</h1>
                </div>
                <div className='comparison-selection-list'>
                    {this.items()}                
                </div>
            </div>
        )
    }
}