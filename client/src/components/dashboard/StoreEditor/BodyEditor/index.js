import React, { Component } from 'react'
import ColorSample from '../Components/ColorSample'
import ImageUploader from '../Components/ImageUploader'
import TextEditor from '../Components/TextEditor'
import './style.scss'

export default class BodyEditor extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render () {
        return (
            <div className='body-editor-section'>                    
                    <div className='color-select'>
                        <h4>Background-Color:</h4>
                        <ColorSample 
                            color={this.props.bodyBgColor}
                            elem={'BODY_BG'}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </div>

                    <h3>Section-A</h3>
                    <div className='image-select'>
                        <h4>Image A:</h4>
                        <ImageUploader 
                            userId={this.props.userId} 
                            image='BODY_IMAGE_A' 
                            updateImage={this.props.updateImage} 
                        />
                    </div>

                    <div className='text-area'>
                        <h3>Text:</h3>
                        <TextEditor 
                            text={this.props.sectionAHeading}
                            color={this.props.sectionAHeadingColor}
                            section='SECTION_A_HEADING'
                            handleTextChange={this.props.handleTextChange}
                            handleColorChange={this.props.handleColorChange}
                            handleFontSizeChange={this.props.handleFontSizeChange}
                            fontSize={this.props.sectionAHeadingFontSize}
                        />
                    </div>
                    
                    <div className='text-area'>
                        <TextEditor 
                            text={this.props.sectionAText}
                            color={this.props.sectionATextColor}
                            section='SECTION_A_TEXT'
                            handleTextChange={this.props.handleTextChange}
                            handleColorChange={this.props.handleColorChange}
                            handleFontSizeChange={this.props.handleFontSizeChange}
                            fontSize={this.props.sectionATextFontSize}
                        />
                    </div>
                    

                    <h3>Section-B</h3>
                    <div className='image-select'>
                        Image B:
                        <ImageUploader 
                            userId={this.props.userId} 
                            image='BODY_IMAGE_B' 
                            updateImage={this.props.updateImage} 
                        />
                    </div>

                    <div className='text-area'>
                        <h3>Text:</h3>
                        <TextEditor 
                            text={this.props.sectionBHeading}
                            color={this.props.sectionBHeadingFontSize}
                            section='SECTION_B_HEADING'
                            handleTextChange={this.props.handleTextChange}
                            handleColorChange={this.props.handleColorChange}
                            handleFontSizeChange={this.props.handleFontSizeChange}
                            fontSize={this.props.sectionBHeadingFontSize}
                        />
                    </div>
 
                    <div className='text-area'>
                        <TextEditor 
                            text={this.props.sectionBText}
                            color={this.props.sectionBTextColor}
                            section='SECTION_B_TEXT'
                            handleTextChange={this.props.handleTextChange}
                            handleColorChange={this.props.handleColorChange}
                            handleFontSizeChange={this.props.handleFontSizeChange}
                            fontSize={this.props.sectionBTextFontSize}
                        />
                    </div>
            </div>
        )
    }
}
