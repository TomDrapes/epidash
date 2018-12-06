import React from 'react'

export default function ItemInFocus(props) {
    return (        
        <div className='item-in-focus-container'>
            <div className='item-in-focus-heading-tab'>
                <p>SELECTED ITEM</p>
            </div>
            <img className='item-in-focus-img' src={props.item.imageUrl} alt={props.item.title}/>
            <div className='item-in-focus-return-btn'>
                <p onClick={() => props.toggleImageMatchState()}>
                    <i className='fas fa-arrow-circle-left' />RETURN TO SEARCH
                </p>
            </div>
        </div>
    )
}