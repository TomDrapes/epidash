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
            openHeaderMenu: false
        }
    }

    header = () => {
        let {logo, logoWidth, logoHeight, socialMedia} = this.state
        return (
            <div className='template-header'>
                <img src={logo} alt='store logo' width={logoWidth} height={logoHeight} />
                {socialMedia.facebook & <a href={socialMedia.facebook}><i class="fab fa-facebook-square" /></a> }
                {socialMedia.instagram & <a href={socialMedia.instagram}><i class="fab fa-instagram" /></a> }
                {socialMedia.twitter & <a href={socialMedia.twitter}><i class="fab fa-twitter-square" /></a> }
            </div>
        )
    }

    headerCarat = () => {
        if(this.state.openHeaderMenu) return <i class='fa fa-caret-up' />
        return <i class='fa fa-caret-down' />
    }

    headerMenu = () => {
        return (            
            <div>
                <p onClick={() => this.setState({ openHeaderMenu: !this.state.openHeaderMenu })}>HEADER {this.headerCarat()}</p>
                <div className='color-picker'>
                    {this.state.openHeaderMenu ? <ColorPicker /> : null}
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className='store-editor-container'>
                <div className='store-editor'>
                    <div className='store-editor-title-bar'>STORE EDITOR</div>
                    <div className='store-editor-menu'>
                        <ul>
                            <li>LOGO</li>
                            <li>{this.headerMenu()}</li>
                            <li>PRODUCT</li>
                            <li>FOOTER</li>
                        </ul>
                    </div>                
                </div>
                <div className='template-page-container'>
                    <TemplatePage header={this.state.header} body={this.state.body} footer={this.state.footer} />
                </div>
                
            </div>
        )
    }
}