import React, { Component } from 'react'
import PieChart from '../PieChart'
import './style.scss'

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
        if(matchedItems.length < 1){ return 0 }
        return parseFloat(matchedItems.reduce((accumulator, current) => {
            return accumulator + parseFloat(current.price.value)
        }, 0)/matchedItems.length).toFixed(2)
    }

    minMaxSalePrice(choice) {
        let { matchedItems } = this.props
        if(matchedItems.length > 0){
            matchedItems.sort((a, b) => {
                return (
                    parseFloat(a.price.value) - parseFloat(b.price.value)
                )
            })
            if(choice === 0) { //wants max price
                return matchedItems[matchedItems.length-1].price.value
            }
            return matchedItems[0].price.value
        }
        return 0
    }

    minSale
    margin() {
        if(this.props.matchedItems.length < 1) return 0
        return parseFloat(this.averageSalePrice() - parseFloat(this.props.selectedItem.price.value)).toFixed(2)
    }

    render(){
        let margin = parseFloat(this.margin()) > 0 ? 'live-analysis-stats-margin live-analysis-positive-font-color' : 'live-analysis-stats-margin live-analysis-negative-font-color'
        let data = [
            parseFloat(this.props.selectedItem.price.value), 
            parseFloat(this.averageSalePrice()),
            parseFloat(this.minMaxSalePrice(0)),
            parseFloat(this.minMaxSalePrice(1))
        ]
        return (
            <div className='live-analysis-container'>
                <div className='live-analysis-heading-tab'>
                    <p>ANALYSIS</p>
                </div>
                <ul className='live-analysis-stats-list'>
                    <li>Wholesale: <p>${parseFloat(this.props.selectedItem.price.value).toFixed(2)} {this.props.selectedItem.price.currency}</p></li>
                    <li>Shipping: <p>${parseFloat(this.props.selectedItem.freight.price.value).toFixed(2)} {this.props.selectedItem.freight.price.currency}</p></li>
                    <li>Avg. Resale: <p>${this.averageSalePrice()} </p></li>
                    <li>Max. Resale: <p>${this.minMaxSalePrice(0)}</p></li>
                    <li>Min. Resale: <p>${this.minMaxSalePrice(1)}</p></li>
                    <li>Avg. Margin: <p className={margin}>${this.margin()}</p></li>
                    <li>Local Listings: <p>{this.props.totalEbayEntries}</p></li>
                </ul>
                <div className='live-analysis-pie-chart-container'>
                    <PieChart data={data} />
                    <ul className='live-analysis-pie-chart-side-data'>
                        <li className='live-analysis-wholesale-bullet'>Wholesale</li>
                        <li className='live-analysis-average-bullet'>Average</li>
                        <li className='live-analysis-max-bullet'>Maximum</li>
                        <li className='live-analysis-min-bullet'>Minimum</li>
                    </ul>                
                </div>
                <div className='live-analysis-update-shortlist-btn' onClick={() => this.props.updateShortList()}>
                    <p>UPDATE SHORTLIST</p>
                </div>
            </div>            
        )
    }
}