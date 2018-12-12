import React from 'react'
import './style.css'

export default function SearchResult(props) {
    return (
        <div className='search-result-item-listing'>
            <div className="search-result-item-description">
                <div className='search-result-item-img-container'>
                    <img className='search-result-item-img' src={props.item.imageUrl} alt={props.item.title}/>                
                </div>
                <div className='search-result-item-details'>
                    <p className='search-result-item-title'>{props.item.title}</p>
                    <p className='search-result-item-lot-size'>lot size: {props.item.lotSize}</p>
                    <p className='search-result-item-lot-size'>id: {props.item.id}</p>
                    <p className='search-result-item-price'>{props.item.price.currency} ${parseFloat(props.item.price.value).toFixed(2)}</p>
                </div>    
            </div>                        
            <div className="search-result-compare-btn-container">
                <button className='search-result-compare-btn' 
                    onClick={() => props.toggleImageMatchState(props.item)}>
                    Compare
                </button>
            </div>    
        </div>
    )
}