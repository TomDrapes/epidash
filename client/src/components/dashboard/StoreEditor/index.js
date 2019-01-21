import React, { Component } from 'react';
import TemplatePage from './TemplatePage';
import ColorPicker from './ColorPicker';
import axios from 'axios';
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
            selectedMenuItem: '',
            menuItemActive: false,
            headerColor: '#55b7c6',
            headerHeight: '100px',
            selectedFile: null,
            loaded: 0
        }
    }

    headerCarat = (menuItem) => {
        if(this.state.selectedMenuItem === menuItem && this.state.menuItemActive) return <i className='fa fa-caret-up' />
        return <i className='fa fa-caret-down' />
    }

    changeMenuState = (menuItem) => {
        if ( menuItem !== this.state.selectedMenuItem ) {
            this.setState({ selectedMenuItem: menuItem, menuItemActive: true })
        } else {
            this.setState({ selectedMenuItem: menuItem, menuItemActive: !this.state.menuItemActive})
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

    logoMenu = () => {

        const handleSelectedFile = (event) => {
            this.setState({
                selectedFile: event.target.files[0],
                loaded: 0
            })
        }

        const handleUpload = () => {
            const data = new FormData()
            data.append('file', this.state.selectedFile, this.state.selectedFile.name)
            axios.post('/upload', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                    })
                },
            }).then(res => console.log(res.statusText))
        }
        return (
            <div>
                <p onClick={() => this.changeMenuState('logo')}>LOGO {this.headerCarat('logo')}</p>
                <div className='logo-editor-section'>
                    {this.state.selectedMenuItem === 'logo' ?
                        <div>
                            <input type='file' onChange={handleSelectedFile} />
                            <button onClick={handleUpload}>Upload</button>
                            <div> {Math.round(this.state.loaded,2)}%</div>
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
                                <li><h2>{this.logoMenu()}</h2></li>
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