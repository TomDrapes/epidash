import React, { Component } from 'react';
import TemplatePage from './TemplatePage';
import ColorPicker from './ColorPicker';
import './style.scss';


export default class StoreEditor extends Component {

    constructor(props){
        super(props)

        this.state = {
            header: this.header,
            body: this.body,
            footer: this.footer,
            logo: '../../images/hawk_logo.png',
            logoWidth: '40px',
            logoHeight: '40px',
            socialMedia: {},
            openHeaderMenu: false,
            headerColor: '#55b7c6',
            headerHeight: '100px'
        }
    }

    headerCarat = () => {
        if(this.state.openHeaderMenu) return <i className='fa fa-caret-up' />
        return <i className='fa fa-caret-down' />
    }

    headerMenu = () => {
        return (            
            <div>
                <p onClick={() => this.setState({ openHeaderMenu: !this.state.openHeaderMenu })}>HEADER {this.headerCarat()}</p>
                <div className='header-editor-section'>
                    {this.state.openHeaderMenu ? 

                        <div>
                            <ColorPicker color={this.state.headerColor} onChangeComplete={this.updateHeaderColor} /> 
                            <form>
                                <label className='header-height-select'>
                                    HEIGHT:
                                    <input type='text' value={this.state.headerHeight} onChange={this.updateHeaderHeight} />
                                </label>
                            </form>
                        </div>
                    
                    : null}
                </div>
            </div>
        )
    }

    updateHeaderColor = (data) => {
        console.log(data)
        this.setState({ headerColor: data.hex })
    }

    updateHeaderHeight = (e) => {
        this.setState({ headerHeight: e.target.value})
    }

    render(){
        return (
            <div className='store-editor-container'>

                <div className='store-editor-window'>
            
                    <div className='store-editor-title-bar'>STORE EDITOR</div>                
                    
                    <div className='store-editor'>
            
                        <div className='store-editor-menu'>
                            <ul>
                                <li><h2>LOGO</h2></li>
                                <li><h2>{this.headerMenu()}</h2></li>
                                <li><h2>PRODUCT</h2></li>
                                <li><h2>FOOTER</h2></li>
                            </ul>
            
                        </div>                
            
                        <TemplatePage 
                            headerColor={this.state.headerColor} 
                            headerHeight={this.state.headerHeight}
                        />
                        
                
                </div>
            </div>
                
            </div>
        )
    }
}