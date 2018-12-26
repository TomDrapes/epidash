import React, { Component } from 'react'
import ImageMatch from './ImageMatch'
import ComparisonTable from './ComparisonTable'
import openSocket from 'socket.io-client'
import ItemInFocus from './ItemInFocus';
import LiveAnalysis from './LiveAnalysis';
import axios from 'axios'
import uuid from 'uuid'
import './style.scss'

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {
            showImageMatch: false,
            alibabaList: [],
            aliSearchSuccess: true,
            ebayList: [],
            ebaySearchSuccess: true,
            waitingForSearchResults: false,
            selectedItem: {},
            matchedItems: [],
            totalEbayEntries: 0,
            totalAliEntries: 0,
            ebayPageNumber: 1,
            aliScrollIdentifier: '',
            keyword: '',
            selectedSource: 'alibaba'
        }
    }

    search = (keyword) => {
        console.log('Searching for %s', keyword)
        this.setState({ waitingForSearchResults: true, keyword })
        let promise1 = axios.post('/api/account/aliexpress/search', { keyword, scrollIdentifier: '' })
            .then(res => {
                console.log(res)
                if (res.data.items.length > 0){
                    this.setState({ 
                        alibabaList: res.data.items,
                        aliSearchSuccess: true,
                        aliScrollIdentifier: res.data.aliRes.aggregation.scrollIdentifier
                    })
                }else{
                    this.setState({ aliSearchSuccess: false, totalAliListingsRetrieved: 0 })
                }
                this.setState({ totalAliEntries: res.data.itemsCount })
            }).catch(err => console.log(err))

        let promise2 = axios.post('/api/account/ebay/search', { keyword, pageNumber: 1 })
            .then(res => {
                console.log(res)
                if(res.data.items.length > 0){
                    this.setState({ 
                        ebayList: res.data.items, 
                        ebaySearchSuccess: true, 
                        totalEbayListingsRetrieved: 50
                })
                }else{
                    this.setState({ ebaySearchSuccess: false, totalEbayListingsRetrieved: 0 })
                }
                this.setState({ totalEbayEntries: res.data.itemCount })
            }).catch(err => console.log(err))

        Promise.all([promise1, promise2]).then(() => this.setState({ waitingForSearchResults: false }))
    }

    retrieveMoreListings = (source) => {
        switch (source) {
            case 'alibaba': this.loadMoreFromAli();
                break;
            case 'ebay': this.loadMoreFromEbay();
                break;
            default: console.log('something went wrong')
        }
    }

    loadMoreFromAli = () => {
        console.log('retrieving more from aliexpress')
        this.setState({ waitingForSearchResults: true })
        axios.post('/api/account/aliexpress/search', { keyword: this.state.keyword, scrollIdentifier: this.state.aliScrollIdentifier})
            .then(res => {
               if (res.data.items.length > 0){    
                    this.setState({ 
                        alibabaList: this.state.alibabaList.concat(res.data.items),
                        aliScrollIdentifier: res.data.aliRes.aggregation.scrollIdentifier,
                        waitingForSearchResults: false
                    })
                }else{ this.setState({ waitingForSearchResults: false })}
            }).catch(err => console.log(err))
    }

    loadMoreFromEbay = () => {
        console.log('retrieving more from ebay')
        this.setState({ waitingForSearchResults: true })
        let pageNumber = this.state.ebayPageNumber + 1
        axios.post('/api/account/ebay/search', { keyword: this.state.keyword, pageNumber })
            .then(res => {
                console.log(res)
                if (res.data.items.length > 0){
                    this.setState({
                        ebayList: this.state.ebayList.concat(res.data.items),
                        ebayPageNumber: pageNumber,
                        waitingForSearchResults: false
                    })
                }else{ this.setState({ waitingForSearchResults: false })}
            }).catch(err => console.log(err))
    }

    toggleImageMatchState = (selectedItem) => {
        this.setState({
            showImageMatch: !this.state.showImageMatch,
            selectedItem: selectedItem,
            matchedItems: []
        })
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
            id: uuid(),
            source: this.state.selectedItem,
            competition: this.state.matchedItems
        }

        axios.put(`/api/account/shortlist/${this.props.userId}`, newShortListItem)
            .then(res => console.log(res))
    }

    setSelectedSource = (source) => {
        this.setState({ selectedSource: source })
    }

    imageMatch = () => {
        if(this.state.selectedSource === 'ebay'){ //source of the selected item being compared
            return (
                <ImageMatch
                    items={this.state.alibabaList}
                    addMatch={this.addMatch}
                    removeMatch={this.removeMatch}
                    retrieveMoreListings={this.retrieveMoreListings}
                    source='alibaba' // source of items being used to select matches
                />
            )
        }else if(this.state.selectedSource === 'alibaba'){ // source of the selected item being compared
            return (
                <ImageMatch
                    items={this.state.ebayList}
                    addMatch={this.addMatch}
                    removeMatch={this.removeMatch}
                    retrieveMoreListings={this.retrieveMoreListings}
                    source='ebay' // source for items being used to select matches
                />
            )
        }
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
                    { this.imageMatch() }
                </div>
            )
        }else{
            return (
                <div className='price-compare-container'>
                    <ComparisonTable
                        waitingForSearchResults={this.state.waitingForSearchResults}
                        ebayList={this.state.ebayList}
                        alibabaList={this.state.alibabaList}
                        aliSearchSuccess={this.state.aliSearchSuccess}
                        ebaySearchSuccess={this.state.ebaySearchSuccess}
                        toggleImageMatchState={this.toggleImageMatchState}
                        totalEbayEntries={this.state.totalEbayEntries}
                        totalAliEntries={this.state.totalAliEntries}
                        search={this.search}
                        retrieveMoreListings={this.retrieveMoreListings}
                    />
                </div>
            )
        }
    }
}
