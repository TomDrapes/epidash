import React, { Component } from 'react'
import './style.css'

export default class ComparisonOverlayListItem extends Component {
    constructor(props){
        super(props)

        this.state = {
            selected : false
        }
    }

    handleClick = (item) => {
        this.props.addMatch(item)
        this.setState({ selected: !this.state.selected })
    } 

    render() {
        let imageStyle = 'image-match-item-img'
        if(this.state.selected){
            imageStyle = 'image-match-item-img image-match-item-img-selected'
        }

        return (
            <div>
                <img 
                    className={imageStyle}
                    onClick={() => this.handleClick(this.props.item)}
                    src={this.props.item.imageUrl}
                />
            </div>
        )
    }
}