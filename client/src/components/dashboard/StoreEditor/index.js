import React, { Component } from 'react'
import TemplatePage from './TemplatePage'
import LogoEditor from './LogoEditor'
import HeaderEditor from './HeaderEditor'
import BodyEditor from './BodyEditor'
import BannerEditor from './BannerEditor'
import {
  headingPlaceholderText,
  subheadingPlaceholderText,
  bannerPlaceholderText,
  sectionAHeading,
  sectionAText,
  sectionBHeading,
  sectionBText
} from './placeholderText'
import './style.scss'

export default class StoreEditor extends Component {

    constructor(props){
        super(props)

        this.state = {
            logo: `/images/logo_placeholder.png`,
            logoWidth: '100',
            selectedMenuItem: '',
            menuItemActive: false,
            heroImage: '/images/header_placeholder_1920.jpg',
            menuFontColor: '#fff',
            menuFontSize: '18',
            headingText: headingPlaceholderText,
            headingFontColor: '#fefefe',
            headingFontSize: '44',
            subheadingFontSize: '22',
            subheadingFontColor: '#fff',
            subheadingText: subheadingPlaceholderText,
            buttonFontColor: '#fff',
            buttonFontSize: '22',
            buttonBgColor: '#2c2c2c',
            bodyImageA: '/images/glasses_yellow.jpg',
            bodyImageB: '/images/sunglasses_on_record.png',
            bodyBgColor: '#fff',
            sectionAHeading: sectionAHeading,
            sectionAHeadingFontSize: '18',
            sectionAHeadingColor: '#373a3c',
            sectionAText: sectionAText,
            sectionATextFontSize: '18',
            sectionATextColor: '#373a3c',
            sectionBHeading: sectionBHeading,
            sectionBHeadingFontSize: '18',
            sectionBHeadingColor: '#373a3c',
            sectionBText: sectionBText,
            sectionBTextFontSize: '18',
            sectionBTextColor: '#373a3c',
            bannerImage: '/images/girl_sunglasses.jpg',
            bannerText: bannerPlaceholderText,
            bannerTextColor: '#373a3c',
            bannerTextFontSize: '44',
            bannerTextBgColor: 'rgba(255,255,255,0.5)'
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
        console.log(event)
        let {r, g, b, a} = event.rgb
        let rgb = `rgba(${r}, ${g}, ${b}, ${a})`
        switch (elem) {
            case 'MENU_FONT': this.setState({ menuFontColor: rgb })
            break
            case 'MAIN_HEADING': this.setState({ headingFontColor: rgb })
            break
            case 'MAIN_SUBHEADING': this.setState({ subheadingFontColor: rgb })
            break
            case 'BUTTON_FONT': this.setState({ buttonFontColor: rgb})
            break
            case 'BUTTON_BG': this.setState({ buttonBgColor: rgb })
            break
            case 'SECTION_A_HEADING': this.setState({ sectionAHeadingColor: rgb })
            break
            case 'SECTION_A_TEXT': this.setState({ sectionATextColor: rgb })
            break
            case 'SECTION_B_HEADING': this.setState({ sectionBHeadingColor: rgb })
            break
            case 'SECTION_B_TEXT': this.setState({ sectionBTextColor: rgb })
            break
            case 'BODY_BG': this.setState({ bodyBgColor: rgb })
            break
            case 'BANNER': this.setState({ bannerTextColor: rgb })
            break
            case 'BANNER_TEXT_BG': this.setState({ bannerTextBgColor: rgb })
            break
            default: break
        }

    }

    handleFontSizeChange = (fontSize, elem) => {
        switch(elem){
            case 'MENU': this.setState({ menuFontSize: fontSize })
            break
            case 'MAIN_HEADING': this.setState({ headingFontSize: fontSize })
            break
            case 'MAIN_SUBHEADING': this.setState({ subheadingFontSize: fontSize })
            break
            case 'HEADING_BUY_NOW_BUTTON': this.setState({ buttonFontSize: fontSize })
            break
            case 'SECTION_A_HEADING': this.setState({ sectionAHeadingFontSize: fontSize })
            break
            case 'SECTION_A_TEXT': this.setState({ sectionATextFontSize:  fontSize})
            break
            case 'SECTION_B_HEADING': this.setState({ sectionBHeadingFontSize:  fontSize})
            break
            case 'SECTION_B_TEXT': this.setState({ sectionBTextFontSize:  fontSize})
            break
            case 'BANNER': this.setState({ bannerTextFontSize: fontSize })
            default: break
        }
    }

    handleTextChange = (e, elem) => {
        console.log(typeof e)
        switch (elem) {
            case 'MAIN_HEADING': this.setState({ headingText: e })
            break
            case 'MAIN_SUBHEADING': this.setState({ subheadingText: e })
            break
            case 'SECTION_A_HEADING': this.setState({ sectionAHeading: e})
            break
            case 'SECTION_A_TEXT': this.setState({ sectionAText: e })
            break
            case 'SECTION_B_HEADING': this.setState({ sectionBHeading: e })
            break
            case 'SECTION_B_TEXT': this.setState({ sectionBText: e })
            break
            case 'BANNER': this.setState({ bannerText: e })
            break
            default: break
        }
    }

    updateLogoWidth = (width) => {
        this.setState({ logoWidth: width})
    }

    updateImage = (imageURL, image) => {
        switch (image) {
            case 'HERO_IMAGE': this.setState({ heroImage: imageURL })
            break
            case 'LOGO': this.setState({ logo: imageURL })
            break
            case 'BODY_IMAGE_A': this.setState({ bodyImageA: imageURL})
            break
            case 'BODY_IMAGE_B': this.setState({ bodyImageB: imageURL })
            break
            case 'BANNER_IMAGE': this.setState({ bannerImage: imageURL })
            break
            default: break
        }
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
                                            updateImage={this.updateImage}
                                            updateLogoWidth={this.updateLogoWidth}
                                            logoWidth={this.state.logoWidth}
                                            logo={this.state.logo}
                                        /> : null}
                                </li>
                                <li>
                                    <h2 onClick={() => this.changeMenuState('header')}>HEADER {this.headerCarat('header')}</h2>
                                    {this.state.selectedMenuItem === 'header' ?
                                        <HeaderEditor
                                            userId={this.props.userId}
                                            menuFontColor={this.state.menuFontColor}
                                            menuFontSize={this.state.menuFontSize}
                                            headingFontColor={this.state.headingFontColor}
                                            headingFontSize={this.state.headingFontSize}
                                            subheadingFontColor={this.state.subheadingFontColor}
                                            subheadingFontSize={this.state.subheadingFontSize}
                                            subheadingText={this.state.subheadingText}
                                            buttonFontSize={this.state.buttonFontSize}
                                            buttonFontColor={this.state.buttonFontColor}
                                            buttonBgColor={this.state.buttonBgColor}
                                            handleFontSizeChange={this.handleFontSizeChange}
                                            handleColorChange={this.handleColorChange}
                                            handleHeroImageChange={this.handleHeroImageChange}
                                            headingText={this.state.headingText}
                                            handleTextChange={this.handleTextChange}
                                            updateImage={this.updateImage}
                                        />
                                        : null
                                    }
                                </li>
                                <li>
                                    <h2 onClick={() => this.changeMenuState('body')}>BODY {this.headerCarat('body')}</h2>
                                    {this.state.selectedMenuItem === 'body' ?
                                        <BodyEditor
                                          updateImage={this.updateImage}
                                          sectionAHeading={this.state.sectionAHeading}
                                          sectionAHeadingFontSize={this.state.sectionAHeadingFontSize}
                                          sectionAHeadingColor={this.state.sectionAHeadingColor}
                                          sectionAText={this.state.sectionAText}
                                          sectionATextFontSize={this.state.sectionATextFontSize}
                                          sectionATextColor={this.state.sectionATextColor}
                                          sectionBHeading={this.state.sectionBHeading}
                                          sectionBHeadingFontSize={this.state.sectionBHeadingFontSize}
                                          sectionBHeadingColor={this.state.sectionBHeadingColor}
                                          sectionBText={this.state.sectionBText}
                                          sectionBTextFontSize={this.state.sectionBTextFontSize}
                                          sectionBTextColor={this.state.sectionBTextColor}
                                          handleTextChange={this.handleTextChange}
                                          handleColorChange={this.handleColorChange}
                                          bodyBgColor={this.state.bodyBgColor}
                                          handleFontSizeChange={this.handleFontSizeChange}
                                        />
                                        : null
                                    }
                                </li>
                                <li>
                                    <h2 onClick={() => this.changeMenuState('banner')}>BANNER {this.headerCarat('banner')}</h2>
                                    {this.state.selectedMenuItem === 'banner' ? 
                                        <BannerEditor
                                            userId={this.props.userId}
                                            updateImage={this.updateImage}
                                            text={this.state.bannerText}
                                            textColor={this.state.bannerTextColor}
                                            textBgColor={this.state.bannerTextBgColor}
                                            handleTextChange={this.handleTextChange}
                                            handleFontSizeChange={this.handleFontSizeChange}
                                            handleColorChange={this.handleColorChange}
                                        />
                                        : null
                                    }
                                </li>

                                <li><h2>PRODUCT</h2></li>
                                <li><h2>FOOTER</h2></li>
                            </ul>

                        </div>

                        <TemplatePage
                            heroImage={this.state.heroImage}
                            logo={this.state.logo}
                            logoWidth={this.state.logoWidth}

                            menuFontColor={this.state.menuFontColor}
                            menuFontSize={this.state.menuFontSize}

                            headingFontColor={this.state.headingFontColor}
                            headingFontSize={this.state.headingFontSize}
                            headingText={this.state.headingText}

                            subheadingFontColor={this.state.subheadingFontColor}
                            subheadingFontSize={this.state.subheadingFontSize}
                            subheadingText={this.state.subheadingText}

                            buttonFontColor={this.state.buttonFontColor}
                            buttonFontSize={this.state.buttonFontSize}
                            buttonBgColor={this.state.buttonBgColor}

                            sectionAHeading={this.state.sectionAHeading}
                            sectionAHeadingColor={this.state.sectionAHeadingColor}
                            sectionAHeadingFontSize={this.state.sectionAHeadingFontSize}

                            sectionAText={this.state.sectionAText}
                            sectionATextColor={this.state.sectionATextColor}
                            sectionATextFontSize={this.state.sectionATextFontSize}

                            sectionBHeading={this.state.sectionBHeading}
                            sectionBHeadingColor={this.state.sectionBHeadingColor}
                            sectionBHeadingFontSize={this.state.sectionBHeadingFontSize}

                            sectionBText={this.state.sectionBText}
                            sectionBTextColor={this.state.sectionBTextColor}
                            sectionBTextFontSize={this.state.sectionBTextFontSize}

                            bodyImageA={this.state.bodyImageA}
                            bodyImageB={this.state.bodyImageB}

                            bodyHeadingColor={this.state.bodyHeadingColor}
                            bodyHeadingFontSize={this.state.bodyHeadingFontSize}
                            bodyTextColor={this.state.bodyTextColor}
                            bodyTextFontSize={this.state.bodyTextFontSize}
                            bodyBgColor={this.state.bodyBgColor}

                            bannerText={this.state.bannerText}
                            bannerTextFontSize={this.state.bannerTextFontSize}
                            bannerTextColor={this.state.bannerTextColor}
                            bannerImage={this.state.bannerImage}
                            bannerTextBgColor={this.state.bannerTextBgColor}
                        />


                </div>
            </div>

            </div>
        )
    }
}
