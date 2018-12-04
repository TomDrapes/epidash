import React from 'react'
import { PromiseProvider } from 'mongoose';

export default function ItemInFocus(props) {
    return (        
        <div className='item-in-focus-container'>
            <div className='item-in-focus-heading-tab'>
                <p>SELECTED ITEM</p>
            </div>
            <img className='item-in-focus-img' src={props.item.imageUrl} />
        </div>
    )
}