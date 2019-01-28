import React, { Component } from 'react'
import TemplatePage from './TemplatePage'
import ColorPicker from './ColorPicker'
import LogoEditor from './LogoEditor'
import HeaderEditor from './HeaderEditor'
import './style.scss'

const headingPlaceholderText = 'The Modern Faux Sunglass'

export default class StoreEditor extends Component {

    constructor(props){
        super(props)

        this.state = {
            logo: `/images/logo_placeholder.png`,
            logoWidth: '100',
            selectedMenuItem: '',
            menuItemActive: false,
            headerImage: '/images/header_placeholder_1920.jpg',
            menuFontColor: '#fff',
            headingText: headingPlaceholderText,
            headingFontColor: '#fff',
            subHeadingFontColor: '#fff',
            buttonFontColor: '#fff',
            buttonBgColor: '#2c2c2c'
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

    handleColorChange = (event, elem) => {
        console.log(event.hex)
        switch (elem) {
            case 'MENU_FONT': this.setState({ menuFontColor: event.hex.toString() })
            break
            case 'HEADING_FONT': this.setState({ headingFontColor: event.hex.toString() })
            break
            case 'SUBHEADING_FONT': this.setState({ subHeadingFontColor: event.hex.toString() })
            break
            case 'BUTTON_FONT': this.setState({ buttonFontColor: event.hex.toString()})
            break
            case 'BUTTON_BG': this.setState({ buttonBgColor: event.hex.toString() })
            break
        }
        
    }

    handleTextChange = (e, elem) => {
        this.setState({ headingText: e })
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
                                <li>
                                    <h2 onClick={() => this.changeMenuState('header')}>HEADER {this.headerCarat('header')}</h2>
                                    {this.state.selectedMenuItem === 'header' ?
                                        <HeaderEditor 
                                            menuFontColor={this.state.menuFontColor}
                                            menuFontSize={this.state.menuFontSize}
                                            headingFontColor={this.state.headingFontColor}
                                            headingFontSize={this.state.headingFontSize}
                                            subHeadingFontColor={this.state.subHeadingFontColor}
                                            subHeadingFontSize={this.state.subHeadingFontSize}
                                            buttonFontSize={this.state.buttonFontSize}
                                            buttonFontColor={this.state.buttonFontColor}
                                            buttonBgColor={this.state.buttonBgColor}
                                            handleFontSizeChange={this.handleFontSizeChange}
                                            handleColorChange={this.handleColorChange}
                                            handleHeroImageChange={this.handleHeroImageChange}
                                            headingText={this.state.headingText}
                                            handleTextChange={this.handleTextChange}                                            
                                        />
                                        : null
                                    }
                                </li>
                                <li><h2>PRODUCT</h2></li>
                                <li><h2>FOOTER</h2></li>
                            </ul>
            
                        </div>                
            
                        <TemplatePage 
                            headerImage={this.state.headerImage}
                            logo={this.state.logo}
                            logoWidth={this.state.logoWidth}
                            menuFontColor={this.state.menuFontColor}
                            headingFontColor={this.state.headingFontColor}
                            subHeadingFontColor={this.state.subHeadingFontColor}
                            buttonFontColor={this.state.buttonFontColor}
                            buttonBgColor={this.state.buttonBgColor}
                            headingText={this.state.headingText}
                        />
                        
                
                </div>
            </div>
                
            </div>
        )
    }
}