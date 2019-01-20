import React, {Component} from 'react'
import './style.scss'

export default class TemplatePage extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        return (
            <div className='template-page-container'>
                <div className='template-page'> 
                    <div className='template-header' style={{
                        background: this.props.headerColor,
                        height: this.props.headerHeight
                        }}>
                    hey
                    </div>
        
                </div>            
            </div>
        )    
    }
}