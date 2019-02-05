import React, { Component } from 'react'
import ImageUploader from '../Components/ImageUploader'
import TextEditor from '../Components/TextEditor'
import ColorSample from '../Components/ColorSample'
import './style.scss'

export default class BannerEditor extends Component {
    render(){
        return (
            <div className='banner-editor'>
                <div>
                    <h3>Image:</h3>
                    <ImageUploader
                        userId={this.props.userId}
                        image='BANNER_IMAGE'
                        updateImage={this.props.updateImage}
                    />
                </div>

                <div>
                    <h3>Text:</h3>
                    <TextEditor
                        text={this.props.text}
                        color={this.props.textColor}
                        section='BANNER'
                        handleTextChange={this.props.handleTextChange}
                        handleColorChange={this.props.handleColorChange}
                        handleFontSizeChange={this.props.handleFontSizeChange}
                        fontSize={this.props.textFontSize}
                    />
                </div>                        

                <div className='color-select'>
                    <h4>Text-Background:</h4>
                    <ColorSample
                        color={this.props.textBgColor}
                        elem={'BANNER_TEXT_BG'}
                        handleColorChange={this.props.handleColorChange}
                    />
                </div>
            </div>
        )
    }

}