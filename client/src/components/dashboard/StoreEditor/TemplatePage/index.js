import React, {Component} from 'react'
import reactCSS from 'reactcss'
import './style.scss'

export default class TemplatePage extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
        const styles = reactCSS({
            'default': {
                logo: {                    
                    alignSelf: this.props.logoPos,               
                },
                header: {
                    background: this.props.headerColor,
                    height: this.props.headerHeight,
                    boxShadow: '0px 2px 5px 0px rgba(0,0,0,0.7)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                },
            }
        })
        return (
            <div className='template-page-container'>
                <div className='template-page'> 
                    <div className='template-header' style={styles.header}>
                        <img style={styles.logo} src={this.props.logo} width={`${this.props.logoWidth}px`} height={`auto`} alt='page-logo' />
                    </div>
        
                </div>            
            </div>
        )    
    }
}