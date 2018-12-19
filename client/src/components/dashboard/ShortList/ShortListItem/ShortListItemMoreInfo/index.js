import React, { Component } from 'react'
import ImageScroll from './ImageScroll'
import axios from 'axios'
import './style.css'

export default class ShortListItemMoreInfo extends Component{
    constructor(props){
        super(props)

        this.state = {
            loading: true,
            detailedInfo: {}
        }
    }

    componentDidMount() {
        let item = { productId: this.props.productId }
        axios.post('/api/account/aliexpress/item-details', item)
            .then(res => {
                console.log(res)
                this.setState({ loading: false, detailedInfo: res.data })
            })
            .catch(err => console.log(err))
    }

    attributes = () => {
        return this.state.detailedInfo.attributes.map((attr, index) => {
            return (
                <div className='shortlist-item-more-info-attribute' key={index}>
                    <p>{attr.name}: {attr.value}</p>
                </div>
            )
        })
    }

    promotions = () => {
        return this.state.detailedInfo.promotions.map((promo, index) => {
            return (
                <div className='shortlist-item-more-info-promotions' key={index}>
                    <p>Discount: {promo.discount}% off</p>
                    <p>Max. price: ${promo.maxAmount.value}</p>
                    <p>Min. price: ${promo.minAmount.value}</p>
                    <p>Stock: {promo.stock}</p>
                    <p>Ending:   {promo.timeLeft.days}:D  {promo.timeLeft.hours}:H  {promo.timeLeft.minutes}:M  {promo.timeLeft.seconds}:S
                    </p>
                </div>
            )
        })
    }

    rating = () => {
        let integer = Math.floor(this.state.detailedInfo.reviews.ratings)
        let stars = []
        for(var i = 0; i < integer; i++){
            stars.push(<i className='fas fa-star shortlist-item-more-info-star-checked' key={i} />)
        }
        for(var j = stars.length; j < 5; j++){
            stars.push(<i className="fas fa-star" key={j}/>)
        }
        return stars
    }

    render(){
        if(this.state.loading) return <div>loading...</div>
        let item = this.state.detailedInfo
        return (
            <div className='shortlist-item-more-info-container'>
                <div className='shortlist-item-more-info-images-container'>
                    <ImageScroll images={this.state.detailedInfo.productImages} />
                </div>
                <div className='shortlist-item-more-info-details'>
                    <p>Source: <a href={item.detailUrl}>{item.detailUrl}</a></p>
                    <p>Seller ID: {item.sellerId}</p>
                    <div className='shortlist-item-more-info-subsection'>
                        <p className='shortlist-item-more-info-heading'>DETAILS</p>
                        {this.attributes()}
                    </div>
                    <div className='shortlist-item-more-info-subsection'>
                        <p className='shortlist-item-more-info-heading'>PROMOTIONS</p>
                        {this.promotions()}
                    </div>
                    <div className='shortlist-item-more-info-subsection'>
                        <p className='shortlist-item-more-info-heading'>REVIEWS</p>
                        <p>Rating: {this.rating()} from {item.reviews.totalCount} reviews</p>
                    </div>
                </div>
            </div>
        )
    }
}
