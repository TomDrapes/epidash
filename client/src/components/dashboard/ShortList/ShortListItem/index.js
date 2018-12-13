import React from 'react'
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
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Wholesale Price</div>
                    <div className='short-list-item-resale-price'>
                        <p>${price.value}</p>                    
                    </div>
                </div>
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Minimum Resale Price</div>
                    <div className='short-list-item-resale-price'>
                        <p>${minResalePrice(competition)}</p>                    
                    </div>
                </div>
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Average Resale Price</div>
                    <div className='short-list-item-resale-price'>
                        <p>${averageSalePrice(competition)}</p>
                    </div>
                </div>
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Maximum Resale Price</div>
                    <div className='short-list-item-resale-price'>
                        <p>${maxResalePrice(competition)}</p>
                    </div>
                </div>
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Minimum Profit</div>
                    <div className='short-list-item-resale-price'>
                        <p>${minResalePrice(competition)-parseFloat(price.value)}</p>
                    </div>
                </div>
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Average Profit</div>
                    <div className='short-list-item-resale-price'>
                        <p>${averageSalePrice(competition)-parseFloat(price.value)}</p>
                    </div>
                </div>
                <div className='short-list-item-info'>
                    <div className='short-list-item-info-heading'>Maximum Profit</div>
                    <div className='short-list-item-resale-price'>
                        <p>${parseFloat(maxResalePrice(competition)-parseFloat(price.value)).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}