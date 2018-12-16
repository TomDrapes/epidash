import React, { Component } from 'react'
import ImageMatch from './ImageMatch'
import ComparisonTable from './ComparisonTable'
import openSocket from 'socket.io-client'
import ItemInFocus from './ItemInFocus';
import LiveAnalysis from './LiveAnalysis';
import axios from 'axios'
import './style.css'

const socket = openSocket('http://localhost:9000')

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {            
            socket: socket,
            showImageMatch: false,
            alibabaList: [],
            aliSearchSuccess: true,
            ebayList: [],           
            ebaySearchSuccess: true,
            searchParam: '',
            waitingForSearchResults: false,
            selectedItem: {},
            matchedItems: [],
            totalEbayEntries: 0,
            totalAliEntries: 0
        }      
        
        this.state.socket.on('response_received', (res) => {
            console.log('here')
            this.receiveSocketIO(res)
        })
    }

    receiveSocketIO = (res) => {
        console.log('receiving on socket')

        console.log(res.ebayRes)
        console.log(res.aliRes)
        
        this.setState({ 
            waitingForSearchResults: false,
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
        this.setState({ 
            totalEbayEntries: res.totalEbayEntries,
            totalAliEntries: res.totalAliEntries
        })
        
        
    }

    sendSocketIO = () => {
        console.log('sending on socket')
        this.setState({ waitingForSearchResults: true })
        this.state.socket.emit('request_to_ebay_api', this.state.searchParam)
    }

    toggleImageMatchState = (selectedItem) => {
        this.setState({ 
            showImageMatch: !this.state.showImageMatch, 
            selectedItem: selectedItem,
            matchedItems: []
        })
    }

    onInputChange = (searchParam) => {
        this.setState({ searchParam })
    }

    addMatch = (item, key) => {
        let items = this.state.matchedItems
        let newItem = item
        newItem.key = key
        items.push(newItem)
        this.setState({ matchedItems: items })
    }

    removeMatch = (key) => {
        let items = this.state.matchedItems.filter(item => 
            item.key !== key
        )
        this.setState({ matchedItems: items })
    }

    
    updateShortList = () => {

        let newShortListItem = {
            source: this.state.selectedItem,
            competition: this.state.matchedItems
        }

        axios.put(`/api/account/shortlist/${this.props.userId}`, newShortListItem)
            .then(res => console.log(res))
    }

    render() {
        let { showImageMatch } = this.state
        if(showImageMatch){
            return (
                <div className="price-compare-item-analysis-container">
                    <div className="price-compare-item-analysis-left-column">
                        <ItemInFocus 
                            item={this.state.selectedItem}
                            toggleImageMatchState={this.toggleImageMatchState}
                        />
                        <LiveAnalysis 
                            selectedItem={this.state.selectedItem}
                            matchedItems={this.state.matchedItems}
                            totalEbayEntries={this.state.totalEbayEntries}
                            updateShortList={this.updateShortList}
                        />
                    </div>
                    <ImageMatch 
                        items={this.state.ebayList}
                        addMatch={this.addMatch}
                        removeMatch={this.removeMatch}
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
                        toggleImageMatchState={this.toggleImageMatchState}
                        totalEbayEntries={this.state.totalEbayEntries}
                        totalAliEntries={this.state.totalAliEntries}
                    />
                </div>
            )
        }
    }
}
