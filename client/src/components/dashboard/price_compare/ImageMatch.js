import React, { Component } from 'react'
import ImageMatchListItem from './ImageMatchListItem'
import uuid from 'uuid'
import './style.css'

export default class ImageMatch extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: this.props.items,
        }
    }

    shouldComponentUpdate(nextProps){
        return nextProps.items !== this.props.items
    }

    items = () => {
        let items = this.state.items.map(item => {
            let id = uuid()
            return (
                <ImageMatchListItem 
                    key={id} 
                    id={id}
                    item={item} 
                    addMatch={this.props.addMatch} 
                    removeMatch={this.props.removeMatch}
                />
            )
        })
        return items
    }
        
    render() {
        return(
            <div className='image-match-container'>
                <div className='image-match-heading-tab'>
                    <h1>SELECT ALL MATCHING PRODUCTS</h1>
                </div>
                <div className='image-match-list'>
                    {this.items()}                
                </div>
            </div>
        )
    }
}