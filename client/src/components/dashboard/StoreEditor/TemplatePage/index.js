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
                    display: 'flex',
                    flexDirection: 'row',
                   // alignItems: this.props.logoPos,
                    justifyContent: this.props.logoPos
                }
            }
        })
        return (
            <div className='template-page-container'>
                <div className='template-page'> 
                    <div className='template-header' style={{
                        background: this.props.headerColor,
                        height: this.props.headerHeight,
                        /*display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'*/
                    }}>
                        <div style={styles.logo}>
                            <img src={this.props.logo} width={`${this.props.logoWidth}px`} height={`${this.props.logoHeight}px`} alt='page-logo' />
                        </div>
                    </div>
        
                </div>            
            </div>
        )    
    }
}