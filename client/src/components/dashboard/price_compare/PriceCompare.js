import React, { Component } from 'react'
import ComparisonOverlay from './ComparisonOverlay'
import ComparisonTable from './ComparisonTable'
import openSocket from 'socket.io-client'
import './style.css'
import ItemInFocus from './ItemInFocus';
import LiveAnalysis from './LiveAnalysis';

const socket = openSocket('http://localhost:9000')

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {            
            socket: socket,
            showComparisonOverlay: false,
            alibabaList: [],
            aliSearchSuccess: true,
            ebayList: [],           
            ebaySearchSuccess: true,
            searchParam: '',
            waitingForSearchResults: false,
            selectedItem: {},
            matchedItems: []
        }      
        
        this.state.socket.on('response_received', (res) => {
            console.log('here')
            this.receiveSocketIO(res)
        })
    }

    receiveSocketIO = (res) => {
        console.log('receiving on socket')
        this.setState({ 
            waitingForSearchResults: false,
            showComparisonOverlay: false
        })
        if (res.ali.length > 0 ) {
            this.setState({ alibabaList: res.ali, aliSearchSuccess: true })
        }else{
            this.setState({ aliSearchSuccess: false })
        }

        if (res.ebay.length > 0) {
            this.setState({ ebayList: res.ebay, ebaySearchSuccess: true })
        } else {
            this.setState({ ebaySearchSuccess: false })
        }
        
    }

    sendSocketIO = () => {
        console.log('sending on socket')
        this.setState({ waitingForSearchResults: true })
        this.state.socket.emit('request_to_ebay_api', this.state.searchParam)
    }

    toggleComparisonOverlay = (selectedItem) => {
        this.setState({ 
            showComparisonOverlay: !this.state.showComparisonOverlay, 
            selectedItem: selectedItem
        })
    }

    onInputChange = (searchParam) => {
        this.setState({ searchParam })
    }

    addMatch = (item) => {
        let items = this.state.matchedItems
        items.push(item)
        this.setState({ matchedItems: items })
    }

    render() {
        let { showComparisonOverlay } = this.state
        if(showComparisonOverlay){
            return (
                <div className="item-analysis-container">
                    <div className="item-analysis-left-column">
                        <ItemInFocus item={this.state.selectedItem} />
                        <LiveAnalysis 
                            selectedItem={this.state.selectedItem}
                            matchedItems={this.state.matchedItems} 
                        />
                    </div>
                    <ComparisonOverlay 
                        items={this.state.ebayList}
                        addMatch={this.addMatch}
                    />                                        
                </div>
            )
        }else{
            return (
                <div className='price-compare-container'>
                    <ComparisonTable
                        waitingForSearchResults={this.state.waitingForSearchResults}
                        onInputChange={this.onInputChange}
                        ebayList={this.state.ebayList}
                        alibabaList={this.state.alibabaList}
                        aliSearchSuccess={this.state.aliSearchSuccess}
                        ebaySearchSuccess={this.state.ebaySearchSuccess}
                        sendSocketIO={() => this.sendSocketIO()}
                        toggleComparisonOverlay={this.toggleComparisonOverlay}
                    />
                </div>
            )
        }
    }
}
