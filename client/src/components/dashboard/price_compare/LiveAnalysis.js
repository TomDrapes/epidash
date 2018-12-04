import React, { Component } from 'react'

export default class LiveAnalysis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            averageSalePrice: 0,
            margin: 0
        }
    }

    averageSalePrice() {
        let { matchedItems } = this.props
        return parseFloat(matchedItems.reduce((accumulator, current) => {
            return accumulator + parseFloat(current.price.value)
        }, 0)/matchedItems.length).toFixed(2)
    }

    minMaxSalePrice(choice) {
        let { matchedItems } = this.props
        if(matchedItems.length > 0){
            matchedItems.sort((a, b) => {
                return parseFloat(a.price.value) - parseFloat(b.price.value)
            })
            if(choice === 0) {
                return matchedItems[matchedItems.length-1].price.value
            }
            return matchedItems[0].price.value
        }
    }

    minSale
    margin() {
        return parseFloat(this.averageSalePrice() - parseFloat(this.props.selectedItem.price.value)).toFixed(2)
    }

    render(){
        return (
            <div className='live-analysis-container'>
                <div className='live-analysis-heading-tab'>
                    <p>ANALYSIS</p>
                </div>
                <ul>
                    <li>Cost: {this.props.selectedItem.price.value}</li>
                    <li>Avg. Sale price: {this.averageSalePrice()} </li>
                    <li>Max Sale price: {this.minMaxSalePrice(0)}</li>
                    <li>Min Sale price: {this.minMaxSalePrice(1)}</li>
                    <li>Avg. Margin: {this.margin()}</li>
                    <li>No. Local Sellers: </li>
                    <li>No. Int. Sellers: </li>
                </ul>
            </div>            
        )
    }
}