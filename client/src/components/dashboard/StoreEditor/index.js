import React, { Component } from 'react'
import TemplatePage from './TemplatePage'
import ColorPicker from './ColorPicker'
import LogoEditor from './LogoEditor'
import './style.scss'


export default class StoreEditor extends Component {

    constructor(props){
        super(props)

        this.state = {
            header: this.header,
            body: this.body,
            footer: this.footer,
            logo: `/images/logo_placeholder.png`,
            logoWidth: '100',
            logoPos: 'center',
            socialMedia: {},
            selectedMenuItem: '',
            menuItemActive: false,
            headerColor: '#55b7c6',
            headerHeight: '100px'
        }       
    }

    headerCarat = (menuItem) => {
        if(this.state.menuItemActive && menuItem === this.state.selectedMenuItem) 
            return <i className='fa fa-caret-up' />
        return <i className='fa fa-caret-down' />
    }

    changeMenuState = (menuItem) => {
        if ( menuItem !== this.state.selectedMenuItem ) {
            this.setState({ selectedMenuItem: menuItem, menuItemActive: true })
        } else {
            this.setState({ selectedMenuItem: '', menuItemActive: !this.state.menuItemActive})
        }
    }

    headerMenu = () => {
        return (            
            <div>
                <p onClick={() => this.changeMenuState('header')}>HEADER {this.headerCarat('header')}</p>
                <div className='header-editor-section'>
                    {this.state.selectedMenuItem === 'header' ? 

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

    updateLogo = (selectedLogo) => {
        this.setState({ logo: selectedLogo })
    }

    updateLogoWidth = (width) => {
        this.setState({ logoWidth: width})
    }

    updateLogoPos = (event) => {
        console.log(event.target.value)
        this.setState({ logoPos: event.target.value })
    }

    render(){
        return (
            <div className='store-editor-container'>

                <div className='store-editor-window'>
            
                    <div className='store-editor-title-bar'>STORE EDITOR</div>                
                    
                    <div className='store-editor'>
            
                        <div className='store-editor-menu'>
                            <ul>
                                <li>
                                    <h2 onClick={() => this.changeMenuState('logo')}>LOGO {this.headerCarat('logo')}</h2>
                                    {this.state.selectedMenuItem === 'logo' ? 
                                        <LogoEditor 
                                            userId={this.props.userId}
                                            updateLogo={this.updateLogo}
                                            updateLogoWidth={this.updateLogoWidth}
                                            updateLogoPos={this.updateLogoPos}
                                            logoWidth={this.state.logoWidth}
                                            logoPos={this.state.logoPos}
                                        /> : null}
                                </li>
                                <li><h2>{this.headerMenu()}</h2></li>
                                <li><h2>PRODUCT</h2></li>
                                <li><h2>FOOTER</h2></li>
                            </ul>
            
                        </div>                
            
                        <TemplatePage 
                            headerColor={this.state.headerColor} 
                            headerHeight={this.state.headerHeight}
                            logo={this.state.logo}
                            logoWidth={this.state.logoWidth}
                            logoPos={this.state.logoPos}                            
                        />
                        
                
                </div>
            </div>
                
            </div>
        )
    }
}