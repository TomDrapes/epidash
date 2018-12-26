import React, { Component } from 'react'
import './style.scss'

export default class ItemInFocus extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render() {
        return (        
            <div className='item-in-focus-container'>
                <div className='item-in-focus-heading-tab'>
                    <p>SELECTED ITEM</p>
                </div>
                <img className='item-in-focus-img' src={this.props.item.imageUrl} alt={this.props.item.title}/>
                <div className='item-in-focus-description'>
                    <p>{this.props.item.title}</p>
                </div>
                <div className='item-in-focus-return-btn'>
                    <p onClick={() => this.props.toggleImageMatchState()}>
                        <i className='fas fa-arrow-circle-left' />RETURN TO SEARCH
                    </p>
                </div>
            </div>
        )
    }
}