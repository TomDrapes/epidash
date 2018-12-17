import React, { Component } from 'react'
import './style.css'

export default class ImageScroll extends Component{
    constructor(props){
        super(props)

        this.state={
            focusedImaged: this.props.images[0]
        }
    }

    images = () => {
        return this.props.images.map(image => {
            return <img 
                        className='shortlist-item-more-info-image'
                        src={image} 
                        width={100} 
                        height={100} 
                        onClick={() => this.setState({ focusedImaged: image })}
                    />
        })
    }

    render() {
        return(
            <div className='shortlist-item-more-info-image-scroll-container'>
                <div className='shortlist-item-more-info-image-scroll-focused'>
                    <img src={this.state.focusedImaged} width={400} height={400} />
                </div>
                <div className='shortlist-item-more-info-image-list'>
                    {this.images()}
                </div>
            </div>
        )
    }
}