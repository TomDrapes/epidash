import React, { Component } from 'react'
import ComparisonOverlayListItem from './ComparisonOverlayListItem'
import './comparisonOverlayStyle.css'

export default class ComparisonOverlay extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: this.props.items,
            matchedItems: []
        }
    }

    addMatch = (item) => {
        let items = this.state.matchedItems
        items.push(item)
        this.setState({ matchedItems: items })
    }

    items = () => {
        let items = this.state.items.map(item => {
            return (
                <ComparisonOverlayListItem item={item} addMatch={() => this.addMatch(item)}/>
            )
        })
        return items
    }
        
    render() {
        return(
            <div className='comparison-overlay-container'>
                {this.items()}
            </div>
        )
    }
}