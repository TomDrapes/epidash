import React, { Component, PureComponent } from 'react'
import axios from 'axios'
import './style.scss'

export default class LogoEditor extends PureComponent {
    constructor(props){
        super(props)

        this.state = {
            selectedFile: null,
            loaded: 0,
            images: null,
            logo: null,
        }
        
        axios.get(`/api/account/images/${this.props.userId}`, this.props.userId)
         .then(res => {
             this.setState({ images: res.data })
             console.log(res.statusText)
        })
    }
        
    handleSelectedFile = (event) => {
        let logoUrl = URL.createObjectURL(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
            logo: logoUrl
        })
        this.props.updateLogo(logoUrl)
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)
        data.append('userId', this.props.userId)
        axios.post(`/api/account/images/upload/${this.props.userId}`, data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                })
            },
        }).then(res => console.log(res.statusText))
    }        
    
    images() {
        if(this.state.images !== null){
            let uploadedImages = this.state.images.map(img => {
                //src here is taking the data URI (base64 encoded string) which the images are stored as in mongoDB
                return <img src={`data:${img.file.mimetype};base64,${img.file.data}`} alt={img.name} width='160px' height='80px' />           
            })
            return uploadedImages            
        }
    }

    handleLogoHeightAdjust = (e) => {
        this.props.updateLogoHeight(e.target.value)
    }

    handleLogoWidthAdjust = (e) => {
        this.props.updateLogoWidth(e.target.value)
    }

    render(){

        return (
            <div>                
                <div className='logo-editor-section'>
                    <input type='file' onChange={(e) => this.handleSelectedFile(e)} />
                    <div className='height-slider'>
                        <p>HEIGHT: {`${this.props.logoHeight}px`}</p>
                        <input type='range' min='50' max='300' value={this.props.logoHeight} onChange={(e) => this.handleLogoHeightAdjust(e)}/>
                    </div>
                    <div className='width-slider'>
                        <p>WIDTH: {`${this.props.logoWidth}px`}</p>
                        <input type='range' min='50' max='300' value={this.props.logoWidth} onChange={(e) => this.handleLogoWidthAdjust(e)}/>
                    </div>

                    <div className='logo-align-select-container'>
                        <p>ALIGNMENT: </p>
                        <select className='logo-align-selector' onChange={this.props.updateLogoPos} >
                            <option value='flex-start'>Left</option>
                            <option value='center'>Center</option>
                            <option value='flex-end'>Right</option>
                        </select>
                    </div>
                    <div>
                        {this.state.logo !== null ? <img src={this.state.logo} width='100px' height='50px' /> : null}
                    </div>
                    <span><button onClick={() => this.handleUpload()}>Upload</button></span>
                    <span> {Math.round(this.state.loaded,2)}%</span>
                </div>
            </div>
        )
    }
}