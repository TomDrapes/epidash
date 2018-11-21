import React, { Component } from 'react'
import axios from 'axios'
import './style.css'

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchParam: '',
            productsList: []
        }
    }

    searchResults = () => {
        let results = this.state.productsList.map(item => {
            return (
                <tr>
                        <td><img src={item.imageUrl} width='100' height='100' /></td>
                        <td><button className='compare-btn'>Compare</button></td>
                        <td><button className='compare-btn'>Compare</button></td>
                        <td><button className='compare-btn'>Compare</button></td>
                        <td>~200</td>
                        <td>Moderate</td>
                        <td className="margin">+$3.40</td>
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
                
                <table className="comparison-table">
                    <tbody>
                        <tr>
                            <th>Alibaba</th>
                            <th>Amazon</th>
                            <th>Gumtree</th>
                            <th>Ebay</th>
                            <th>Listings</th>
                            <th>Competition</th>
                            <th>Margin</th>
                        </tr>
                        {this.searchResults()}
                    </tbody>
                </table>
            </div>
        )
    }
}
