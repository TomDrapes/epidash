import React, { Component } from 'react'
import ShortListItemInfo from './ShortListItemInfo'
import ShortListItemMoreInfo from './ShortListItemMoreInfo'
import './style.css'


export default class ShortListItem extends Component{
    constructor(props){
        super(props)
        
        this.state={
            showMoreInfo: false
        }
    }

    averageSalePrice = (competition) => {
        if(competition.length < 1) return 0
    
        return parseFloat(competition.reduce((acc, curr) => {
            return acc + parseFloat(curr.price.value)
        }, 0)/competition.length).toFixed(2)
    }
    
    minResalePrice = (competition) => {
        if(competition.length < 1) return 0
        return parseFloat(competition[0].price.value).toFixed(2)
    }
    
    maxResalePrice = (competition) => {
        if(competition.length < 1) return 0
        return parseFloat(competition[competition.length-1].price.value).toFixed(2)
    }

    toggleMoreInfo = () => {
        this.setState({ showMoreInfo: !this.state.showMoreInfo })
    }

    render(){
        const { imageUrl, title, lotSize, id, price } = this.props.item.source
    
        const competition = this.props.item.competition.sort((a,b) => {
            return a.price.value - b.price.value
        })
    
        return(
            <li>
                <div className='short-list-item-container'>
                    <img src={imageUrl} alt={title} />
                    <div className='short-list-item-description'>
                        <p className='short-list-item-title'>{title}</p>
                        <div className='short-list-item-description-subsection'>
                            <div>
                                <p className='short-list-item-lot-size'>lot size: {lotSize}</p>
                                <p className='short-list-item-id'>id: {id}</p>
                                <p className='short-list-item-more-info' onClick={() => this.toggleMoreInfo()}><i className="fas fa-caret-down" /> more info</p>
                            </div>
    
                            <div className='short-list-item-delete'>
                                <i className="fas fa-trash-alt" onClick={() => this.props.deleteShortlistItem(this.props.item.id)}></i>
                            </div>
                        </div>
                    </div>
                    <ShortListItemInfo heading={'Wholesale Price'} amount={price.value} />
                    <ShortListItemInfo heading={'Minimum Resale Price'} amount={this.minResalePrice(competition)} />
                    <ShortListItemInfo heading={'Average Resale Price'} amount={this.averageSalePrice(competition)} />
                    <ShortListItemInfo heading={'Maximum Resale Price'} amount={this.maxResalePrice(competition)} />
                    <ShortListItemInfo heading={'Minimum Profit'} amount={parseFloat(this.minResalePrice(competition)-parseFloat(price.value)).toFixed(2)} />
                    <ShortListItemInfo heading={'Average Profit'} amount={parseFloat(this.averageSalePrice(competition)-parseFloat(price.value)).toFixed(2)} />
                    <ShortListItemInfo heading={'Maximum Profit'} amount={parseFloat(this.maxResalePrice(competition)-parseFloat(price.value)).toFixed(2)} />
                </div>
                    {this.state.showMoreInfo && <ShortListItemMoreInfo productId={id} />}
            </li>
        )
    }    
}
