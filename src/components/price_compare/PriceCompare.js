import React, { Component } from 'react'
import './style.css'

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }

    emptyCells = () => (
                <tr>
                    <td><img src='' width='50' height='50' /></td>
                    <td><button>Compare</button></td>
                    <td><button>Compare</button></td>
                    <td><button>Compare</button></td>
                    <td>~200</td>
                    <td>Moderate</td>
                    <td className="margin">+$3.40</td>
                </tr>
    )

    render() {
        return (
            <div className="price-compare-container">
                <input className='input-field' placeholder="type something..."/>
                <table className="comparison-table">
                    <tr>
                        <th>Alibaba</th>
                        <th>Amazon</th>
                        <th>Gumtree</th>
                        <th>Ebay</th>
                        <th>Listings</th>
                        <th>Competition</th>
                        <th>Margin</th>
                    </tr>
                    {this.emptyCells()}
                    {this.emptyCells()}
                    {this.emptyCells()}
                    {this.emptyCells()}
                    {this.emptyCells()}
                    {this.emptyCells()}
                    {this.emptyCells()}
                    {this.emptyCells()}
                </table>
            </div>
        )
    }
}
