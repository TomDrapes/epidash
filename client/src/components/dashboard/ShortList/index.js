import React, { Component } from 'react'
import axios from 'axios'
import ShortListItem from './ShortListItem'
import './style.css'

export default class ShortList extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: [],
            loading: true
        }
    }

    componentDidMount(){
        axios.get(`/api/account/shortlist/${this.props.userId}`)
            .then(res => {
                console.log(res)
                this.setState({ 
                    items: res.data,
                    loading: false
                 })
            }).catch(err => console.log(err))
    }

    shortListItems = () => {
        return this.state.items.map(item => {
            return (
                <ShortListItem item={item} />
            )
        })
    }

    render() {
        if(this.state.loading){
            return <div>Loading...</div>
        }
        return (
            <div className='short-list-container'>
                <div className='short-list'>
                    <ul>
                        {this.shortListItems()}
                    </ul>    
                </div>
            </div>
        )
    }
}