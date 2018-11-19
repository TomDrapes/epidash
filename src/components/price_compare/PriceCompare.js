import React, { Component } from 'react'
import './style.css'

export default class PriceCompare extends Component {

    constructor(props){
        super(props)

        this.state = {}
    }

    emptyCells = () => (
                <tr>
                    <td>{" "}</td>
                    <td>{" "}</td>
                    <td>{" "}</td>
                    <td>{" "}</td>
                    <td>{" "}</td>
                    <td>{" "}</td>
                    <td>{" "}</td>
                </tr>
    )

    render() {
        return (
            <div className="price-compare-container">
                <input className='input-field' placeholder="type something..."/>
                <table className="comparison-table">
                    <tr>
                        <th>Ebay</th>
                        <th>Amazon</th>
                        <th>Gumtree</th>
                        <th>Alibaba</th>
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
