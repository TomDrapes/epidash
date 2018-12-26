import React, { PureComponent } from 'react'
import ImageMatchListItem from '../ImageMatchListItem'
import uuid from 'uuid'
import './style.scss'

export default class ImageMatch extends PureComponent {
    constructor(props){
        super(props)

        this.state = {
            items: this.props.items
        }
    }

    componentDidMount() {
        let scrollElement = document.querySelector('#scrollElement')
        scrollElement.addEventListener('scroll', () => {
            if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight){
                this.props.retrieveMoreListings(this.props.source)
            }
        })
    }

    items = () => {
        let key = 0
        let items = this.props.items.map(item => {
            key++
            return (
                <ImageMatchListItem 
                    key={key} 
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
                <div className='image-match-list' id='scrollElement'>
                    {this.items()}                
                </div>
            </div>
        )
    }
}