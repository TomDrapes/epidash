import React, { Component, PureComponent } from 'react'
import ImageUploader from '../Components/ImageUploader'
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
    
    images() {
        if(this.state.images !== null){
            let uploadedImages = this.state.images.map(img => {
                //src here is taking the data URI (base64 encoded string) which the images are stored as in mongoDB
                return <img src={`data:${img.file.mimetype};base64,${img.file.data}`} alt={img.name} width='160px' height='80px' />           
            })
            return uploadedImages            
        }
    }

    handleLogoSizeAdjust = (e) => {
        this.props.updateLogoWidth(e.target.value)
    }

    render(){

        return (
            <div>                
                <div className='logo-editor-section'>
                    <ImageUploader 
                        userId={this.props.userId}
                        image='LOGO'
                        updateImage={this.props.updateImage}
                    />                    
                    <div className='width-slider'>
                        <p>SIZE: </p>
                        <input type='range' min='100' max='400' value={this.props.logoWidth} onChange={(e) => this.handleLogoSizeAdjust(e)}/>
                    </div>

                    <div>
                        {this.state.logo !== null ? <img src={this.state.logo} width='100px' height='50px' /> : null}
                    </div>                   
                </div>
            </div>
        )
    }
}