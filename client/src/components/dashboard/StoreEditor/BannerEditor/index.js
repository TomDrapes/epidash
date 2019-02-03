import React, { Component } from 'react'
import ImageUploader from '../Components/ImageUploader'
import TextEditor from '../Components/TextEditor'
import ColorSample from '../Components/ColorSample'

export default class BannerEditor extends Component {
    render(){
        return (
            <div>
                <form>
                    <label>
                        Background-Image:
                        <ImageUploader
                            userId={this.props.userId}
                            image='BANNER_IMAGE'
                            updateImage={this.props.updateImage}
                        />
                    </label>

                    <label>
                        Text:
                        <TextEditor
                            text={this.props.text}
                            section='BANNER_TEXT'
                            handleTextChange={this.props.handleTextChange}
                        />
                    </label>

                    <label>
                        Font-Size:
                        <input 
                            type='range' 
                            min='16' 
                            max='32' 
                            onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'BANNER_TEXT')} 
                        />
                    </label>

                    <label>
                        Text-Color:
                        <ColorSample
                            color={this.props.textColor}
                            elem={'BANNER_TEXT_COLOR'}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </label>

                    <label>
                        Text-Background:
                        <ColorSample
                            color={this.props.textBgColor}
                            elem={'BANNER_TEXT_BG'}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </label>

                </form>
            </div>
        )
    }

}