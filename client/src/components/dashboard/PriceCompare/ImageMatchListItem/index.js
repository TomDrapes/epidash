import React, { PureComponent } from 'react'
import uuid from 'uuid'
import './style.scss'

export default class ImageMatchListItem extends PureComponent {
    constructor(props){
        super(props)

        this.state = {
            selected: false,
            id: uuid()
        }
    }

    componentDidUpdate(){
        if(this.state.selected){
            this.props.addMatch(this.props.item, this.state.id)
        }else{
            this.props.removeMatch(this.state.id)
        }
    }

    handleClick = () => {
        this.setState((prevState) => { 
            return { selected: !prevState.selected }
        })
    }

    render() {
        let imageStyle = 'image-match-list-item-container'
        if(this.state.selected){
            imageStyle = 'image-match-list-item-container image-match-list-item-selected'
        }

        return (
            <div className={imageStyle}>
                <img
                    className='image-match-list-item-img'                    
                    onClick={this.handleClick}
                    src={this.props.item.imageUrl}
                    alt={this.props.item.title}
                />
                <div className='image-match-list-item-img-description-overlay'
                    onClick={this.handleClick}
                >
                    <p>{this.props.item.title}</p>
                </div>
            </div>
        )
    }
}