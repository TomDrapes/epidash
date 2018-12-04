import React from 'react'
import './style.css'

export default function SearchResult(props) {
    return (
        <div className='item-listing'>
            <div className="item-description">
                <img className='item-img' src={props.item.imageUrl} alt={props.item.title}/>
                <div className='item-details'>
                    <p className='item-title'>{props.item.title}</p>
                    <p className='item-lot-size'>lot size: {props.item.lotSize}</p>
                    <p className='item-lot-size'>id: {props.item.id}</p>
                    <p className='item-price'>{props.item.price.currency} ${parseFloat(props.item.price.value).toFixed(2)}</p>
                </div>    
            </div>                        
            <div className="compare-btn-cell"><button className='compare-btn' onClick={() => props.toggleComparisonOverlay(props.item)}>Compare</button></div>    
        </div>
    )
}