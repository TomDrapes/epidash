import React, { Component } from 'react'
import SearchResult from './SearchResult'
import uuid from 'uuid'
import './style.css'

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
        }        
    }    

    updateSelected(source){
        let sourceHeadings = this.state.sourceHeadings
        for (var key in sourceHeadings){
            sourceHeadings[key] = false
        }
        sourceHeadings[source] = true
        this.setState({ sourceHeadings})
    }

    spinner = () => {
        if (this.props.waitingForSearchResults){
            return(
                <div className='search-spinner'>
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
            <div className='no-matches-msg'>
                <p>Search returned 0 results. Refine search and try again.</p>
            </div>
        )
    }

    submit = (e) => {
        e.preventDefault()
        this.props.sendSocketIO()
    }

    render () {
        let alibaba = this.state.sourceHeadings.alibaba ? "heading-selected" : undefined
        let amazon = this.state.sourceHeadings.amazon ? "heading-selected" : undefined
        let ebay = this.state.sourceHeadings.ebay ? "heading-selected" : undefined
        let gumtree = this.state.sourceHeadings.gumtree ? "heading-selected" : undefined
        
        return (
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
                                    onChange={event => this.props.onInputChange(event.target.value)}
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
                                     && this.searchResults(this.props.alibabaList, this.props.aliSearchSuccess)}
                                {ebay === 'heading-selected' 
                                    && this.searchResults(this.props.ebayList, this.props.ebaySearchSuccess)}                            
                            </div>
                    </div>
                </div>
        )
    }
}