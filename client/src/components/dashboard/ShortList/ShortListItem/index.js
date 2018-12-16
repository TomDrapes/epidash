import React from 'react'
import ShortListItemInfo from './ShortListItemInfo'
import './style.css'

const averageSalePrice = (competition) => {
    if(competition.length < 1) return 0

    return parseFloat(competition.reduce((acc, curr) => {
        return acc + parseFloat(curr.price.value)
    }, 0)/competition.length).toFixed(2)
}

const minResalePrice = (competition) => {
    if(competition.length < 1) return 0
    return parseFloat(competition[0].price.value).toFixed(2)
}

const maxResalePrice = (competition) => {
    if(competition.length < 1) return 0
    return parseFloat(competition[competition.length-1].price.value).toFixed(2)
}

export default function ShortListItem(props){

    const { imageUrl, title, lotSize, id, price } = props.item.source

    const competition = props.item.competition.sort((a,b) => {
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
                        </div>
                        <div className='short-list-item-delete'>
                            <p><i class="fas fa-trash-alt"></i></p>
                        </div>
                    </div>
                </div>
                <ShortListItemInfo heading={'Wholesale Price'} amount={price.value} />
                <ShortListItemInfo heading={'Minimum Resale Price'} amount={minResalePrice(competition)} />
                <ShortListItemInfo heading={'Average Resale Price'} amount={averageSalePrice(competition)} />
                <ShortListItemInfo heading={'Maximum Resale Price'} amount={maxResalePrice(competition)} />
                <ShortListItemInfo heading={'Minimum Profit'} amount={minResalePrice(competition)-parseFloat(price.value)} />
                <ShortListItemInfo heading={'Average Profit'} amount={averageSalePrice(competition)-parseFloat(price.value)} />
                <ShortListItemInfo heading={'Minimum Profit'} amount={parseFloat(maxResalePrice(competition)-parseFloat(price.value)).toFixed(2)} />                                
            </div>
        </li>
    )
}