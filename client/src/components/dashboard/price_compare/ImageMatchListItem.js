import React, { Component } from 'react'
import './style.css'

export default class ImageMatchListItem extends Component {
    constructor(props){
        super(props)

        this.state = {
            selected: false
        }
    }

    componentDidUpdate(){
        if(this.state.selected){
            this.props.addMatch(this.props.item, this.props.id)
        }else{
            this.props.removeMatch(this.props.id)
        }
    }

    handleClick = () => {
        this.setState((prevState) => { 
            return { selected: !prevState.selected }
        })
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
                    onClick={this.handleClick}
                    src={this.props.item.imageUrl}
                    alt={this.props.item.title}
                />
            </div>
        )
    }
}