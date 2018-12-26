import React, { Component } from 'react'
import SearchResult from '../SearchResult'
import uuid from 'uuid'
import './style.scss'

export default class ComparisonTable extends Component {
    constructor(props){
        super(props)

        this.state = {
            sourceHeadings: {
                alibaba: true,
                amazon: false,
                ebay: false,
                gumtree: false
            },
            searchParams: ''
        }
        
    }    
    
    componentDidMount(){
        let searchList = document.querySelector('#searchList')
        searchList.addEventListener('scroll', () => {
            if (searchList.scrollTop + searchList.clientHeight >= searchList.scrollHeight){
                let { sourceHeadings } = this.state
                for (var key in sourceHeadings){
                    if(sourceHeadings[key] === true) this.props.retrieveMoreListings(key)
                }
            }
        })
    }

    updateSelected(source){
        let sourceHeadings = this.state.sourceHeadings
        for (var key in sourceHeadings){
            sourceHeadings[key] = false
        }
        sourceHeadings[source] = true
        this.setState({ sourceHeadings })
    }

    spinner = () => {
        if (this.props.waitingForSearchResults){
            return(
                <div className='comparison-table-search-spinner'>
                    <i className='fas fa-spinner fa-spin'></i>                
                </div>
            )
        }
    }

    searchResults = (list, searchSuccess) => {
        if(searchSuccess){
            let results = list.map(item => {
                return (
                    <SearchResult 
                        key={uuid()}
                        item={item}
                        toggleImageMatchState={this.props.toggleImageMatchState}
                    />
                )
            })
            return results
        }
        return(
            <div>
                <p>Search returned 0 results. Refine search and try again.</p>
            </div>
        )
    }

    submit = (e) => {
        e.preventDefault()
        this.props.search(this.state.searchParams)
    }

    searchResultsTotal = () => {
        if(this.state.sourceHeadings.alibaba && this.props.alibabaList.length > 0) return this.props.totalAliEntries
        if(this.state.sourceHeadings.ebay && this.props.ebayList.length > 0) return this.props.totalEbayEntries
        return 0
    }

    render () {
        let alibaba = this.state.sourceHeadings.alibaba ? "comparison-table-heading-selected" : undefined
        let amazon = this.state.sourceHeadings.amazon ? "comparison-table-heading-selected" : undefined
        let ebay = this.state.sourceHeadings.ebay ? "comparison-table-heading-selected" : undefined
        let gumtree = this.state.sourceHeadings.gumtree ? "comparison-table-heading-selected" : undefined
        
        return (
            <div className='comparison-table-container'>
                    <div className='comparison-table-source-headings'>
                        <ul>
                            <li className={alibaba} onClick={() => this.updateSelected('alibaba')}>Alibaba</li>
                            <li className={amazon} onClick={() => this.updateSelected('amazon')}>Amazon</li>
                            <li className={ebay} onClick={() => this.updateSelected('ebay')}>Ebay</li>
                            <li className={gumtree} onClick={() => this.updateSelected('gumtree')}>Gumtree</li>
                        </ul>
                        <div className='comparison-table-input-container'>
                            {this.spinner()}
                            <form id='message_form' onSubmit={this.submit} className='input-group'>
                                <input className='form-control'
                                    onChange={event => this.setState({ searchParams: event.target.value })}
                                    value={this.state.searchParams}
                                    placeholder="Search for products" />
                                <span className='input-group-btn'>
                                    <button type='submit' className= 'btn btn-secondary' >Search</button>
                                </span>
                            </form>
                        </div>
                    </div>              
                    <div className="comparison-table">
                            <div className='comparison-table-search-results-count'>
                                <p>Results: {this.searchResultsTotal()}</p>                            
                            </div>
                            <div id='searchList' className='comparison-table-item-listings-container'>
                                {alibaba === 'comparison-table-heading-selected' 
                                     && this.searchResults(this.props.alibabaList, this.props.aliSearchSuccess)}
                                {ebay === 'comparison-table-heading-selected' 
                                    && this.searchResults(this.props.ebayList, this.props.ebaySearchSuccess)}                            
                            </div>
                    </div>
                </div>
        )
    }
}