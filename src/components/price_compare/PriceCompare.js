import React, { Component } from 'react'
import axios from 'axios'
import './style.css'

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchParam: '',
            productsList: [],
            sourceHeadings: [
                {alibaba: true},
                {amazon: false},
                {ebay: false},
                {gumtree: false}
            ]
        }
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

    searchResults = () => {
        let results = this.state.productsList.map(item => {
            return (
                <tr key={item.id}>
                        <td className="item-description">
                            <img className='item-img' src={item.imageUrl} alt={item.title}/>
                            <div className='item-details'>
                                <p className='item-title'>{item.title}</p>
                                <p className='item-lot-size'>lot size: {item.lotSize}</p>
                                <p className='item-price'>{item.price.currency} ${parseFloat(item.price.value).toFixed(2)}</p>
                            </div>    
                        </td>                        
                        <td className="compare-btn-cell"><button className='compare-btn'>Compare</button></td>
                        <td className="compare-btn-cell"><button className='compare-btn'>Compare</button></td>
                        <td className="compare-btn-cell"><button className='compare-btn'>Compare</button></td>
                </tr>

            )
        })
        return results
    }

    onInputChange(searchParam){
        this.setState({ searchParam })
    }

    submit = (e) => {
        e.preventDefault()
        
        axios({
            method: 'post',
            url: 'https://api.aliseeks.com/v1/search',
            data: {
                text: this.state.searchParam
            },
            headers: {
                'X-Api-Client-Id': 'FPVNMCTQKJOSZPCL'
            }
        }).then(res => {
            console.log(res)
            this.setState({ 
                productsList: res.data.items,
                searchParam: ''
            })
        })
    }
    

    render() {

        let alibaba = this.state.sourceHeadings[0].alibaba ? "heading-selected" : undefined
        let amazon = this.state.sourceHeadings[1].amazon ? "heading-selected" : undefined
        let ebay = this.state.sourceHeadings[2].ebay ? "heading-selected" : undefined
        let gumtree = this.state.sourceHeadings[3].gumtree ? "heading-selected" : undefined
        
        return (
            <div className="price-compare-container">

                <div className='input-container'>
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
                
                <div className='comparison-table-container'>
                    <ul className='source-headings'>
                        <li className={alibaba} onClick={() => this.updateSelected('alibaba')}>Alibaba</li>
                        <li className={amazon} onClick={() => this.updateSelected('amazon')}>Amazon</li>
                        <li className={ebay} onClick={() => this.updateSelected('ebay')}>Ebay</li>
                        <li className={gumtree} onClick={() => this.updateSelected('gumtree')}>Gumtree</li>
                    </ul>                
                    <table className="comparison-table">
                        <tbody>
                            <tr>
                                <th>{''}</th>
                                <th>Amazon</th>
                                <th>Ebay</th>
                                <th>Gumtree</th>
                            </tr>     
                            {this.searchResults()}
                                
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
