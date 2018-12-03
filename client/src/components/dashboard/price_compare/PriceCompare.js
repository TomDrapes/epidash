import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import uuid from 'uuid'

import './style.css'

const socket = openSocket('http://localhost:9000')

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchParam: '',
            alibabaList: [],
            ebayList: [],
            sourceHeadings: [
                {alibaba: true},
                {amazon: false},
                {ebay: false},
                {gumtree: false}
            ],
            socket: socket,
            waitingForSearchResults: false,
            aliSearchSuccess: true,
            ebaySearchSuccess: true,
        }

        this.state.socket.on('response_received', (res) => {
            console.log('here')
            this.receiveSocketIO(res)
        })
    }

    receiveSocketIO = (res) => {
        console.log('receiving on socket')
        this.setState({ waitingForSearchResults: false })
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

    updateSelected(source){
        let updatedHeadings = this.state.sourceHeadings.map(sourceHeading => {
            if (source in sourceHeading){
                return { [Object.keys(sourceHeading)[0]] : true }
            }
            return { [Object.keys(sourceHeading)[0]]: false}
        })
        this.setState({ sourceHeadings: updatedHeadings })        
    }

    searchResults = (list, searchSuccess) => {
        if(searchSuccess){
            let results = list.map(item => {
                return (
                    <div className='item-listing' key={uuid()}>
                            <div className="item-description">
                                <img className='item-img' src={item.imageUrl} alt={item.title}/>
                                <div className='item-details'>
                                    <p className='item-title'>{item.title}</p>
                                    <p className='item-lot-size'>lot size: {item.lotSize}</p>
                                    <p className='item-lot-size'>id: {item.id}</p>
                                    <p className='item-price'>{item.price.currency} ${parseFloat(item.price.value).toFixed(2)}</p>
                                </div>    
                            </div>                        
                            <div className="compare-btn-cell"><button className='compare-btn'>Compare</button></div>
                            <div className="compare-btn-cell"><button className='compare-btn'>Compare</button></div>
                            <div className="compare-btn-cell"><button className='compare-btn'>Compare</button></div>
                    </div>
    
                )
            })
            return results
        }
        return(
            <div className='no-matches-msg'>
                <p>Search returned 0 results. Refine search and try again.</p>
            </div>
        )
    }

    onInputChange(searchParam){
        this.setState({ searchParam })
    }

    submit = (e) => {
        e.preventDefault()
        this.sendSocketIO()
    }
    
    spinner = () => {
        if (this.state.waitingForSearchResults){
            return(
                <div className='search-spinner'>
                    <i className='fas fa-spinner fa-spin'></i>                
                </div>
            )
        }
    }

    render() {

        let alibaba = this.state.sourceHeadings[0].alibaba ? "heading-selected" : undefined
        let amazon = this.state.sourceHeadings[1].amazon ? "heading-selected" : undefined
        let ebay = this.state.sourceHeadings[2].ebay ? "heading-selected" : undefined
        let gumtree = this.state.sourceHeadings[3].gumtree ? "heading-selected" : undefined
        
        return (
            <div className="price-compare-container">

                
                
                <div className='comparison-table-container'>
                    <div className='source-headings'>
                        <ul>
                            <li className={alibaba} onClick={() => this.updateSelected('alibaba')}>Alibaba</li>
                            <li className={amazon} onClick={() => this.updateSelected('amazon')}>Amazon</li>
                            <li className={ebay} onClick={() => this.updateSelected('ebay')}>Ebay</li>
                            <li className={gumtree} onClick={() => this.updateSelected('gumtree')}>Gumtree</li>
                        </ul>
                        <div className='input-container'>
                            {this.spinner()}
                            <form id='message_form' onSubmit={this.submit} className='input-group'>
                                <input className='form-control'
                                    onChange={event => this.onInputChange(event.target.value)}
                                    value={this.state.searchParam}
                                    placeholder="Search for products" />
                                <span className='input-group-btn'>
                                    <button type='submit' className= 'btn btn-secondary' >Search</button>
                                </span>
                            </form>
                        </div>
                    </div>              
                    <div className="comparison-table">
                            <div className='column-headings'>
                                <p>Amazon</p>
                                <p>Ebay</p>
                                <p>Gumtree</p>
                                
                            </div>
                            <div className='item-listings-container'>
                                {alibaba === 'heading-selected' 
                                     && this.searchResults(this.state.alibabaList, this.state.aliSearchSuccess)}
                                {ebay === 'heading-selected' 
                                    && this.searchResults(this.state.ebayList, this.state.ebaySearchSuccess)}                            
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
