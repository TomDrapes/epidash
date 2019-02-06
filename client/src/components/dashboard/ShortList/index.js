import React, { Component } from 'react'
import axios from 'axios'
import ShortListItem from './ShortListItem'
import './style.scss'

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
                console.log(res.data)
                this.setState({
                    items: res.data,
                    loading: false
                 })
            }).catch(err => console.log(err))
    }

    shortListItems = () => {
        return this.state.items.map(item => {
            return (
                <ShortListItem item={item} deleteShortlistItem={this.deleteShortlistItem} key={item.id}/>
            )
        })
    }

    deleteShortlistItem = (key) => {
        console.log(key)
      let updatedShortlist = this.state.items.filter(item => item.id !== key)
      this.setState({   items: updatedShortlist })
      let itemKey = { id: key }
      axios.put(`/api/account/shortlist/remove-item/${this.props.userId}`, itemKey)
        .then(res => console.log(res))
        .catch(err => console.log(err))
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
