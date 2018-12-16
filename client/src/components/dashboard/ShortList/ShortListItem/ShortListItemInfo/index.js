import React from 'react'
import './style.css'

export default function ShortListItemInfo(props){
    return(
        <div className='short-list-item-info'>
            <div className='short-list-item-info-heading'>{props.heading}</div>
            <div className='short-list-item-info-dollar-amount'>
                <p>${props.amount}</p>                    
            </div>
        </div>
    )
}