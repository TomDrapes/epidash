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
                <form>
                    <label>
                        Heading-Color:
                        <ColorSample 
                            color={this.props.bodyHeadingColor}
                            elem={'BODY_HEADING'}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </label>
                    <label>
                        Text-Color:
                        <ColorSample 
                            color={this.props.bodyTextColor}
                            elem={'BODY_TEXT'}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </label>
                    <label>
                        BG-Color:
                        <ColorSample 
                            color={this.props.bodyBgColor}
                            elem={'BODY_BG'}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </label>
                    <label>
                        Heading Font-Size:
                        <input type='range' min='16' max='32' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'BODY_HEADING')} />
                    </label>

                    <label>
                        Paragraph Font-Size:
                        <input type='range' min='16' max='32' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'BODY_TEXT')} />
                    </label>

                    <h2>Section-A</h2>
                    <label className='sectionA-image-select'>
                        Image A:
                        <ImageUploader 
                            userId={this.props.userId} 
                            image='BODY_IMAGE_A' 
                            updateImage={this.props.updateImage} 
                        />
                    </label>

                    <label className='text-area-a'>
                        Text:
                        <TextEditor 
                            text={this.props.sectionAHeading}
                            section='SECTION_A_HEADING'
                            handleTextChange={this.props.handleTextChange}
                        />
                    </label>
                    
                    <label>
                        <TextEditor 
                            text={this.props.sectionAText}
                            section='SECTION_A_TEXT'
                            handleTextChange={this.props.handleTextChange}
                        />
                    </label>
                    

                    <h2>Section-B</h2>
                    <label className='sectionB-image-select'>
                        Image B:
                        <ImageUploader 
                            userId={this.props.userId} 
                            image='BODY_IMAGE_B' 
                            updateImage={this.props.updateImage} 
                        />
                    </label>

                    <label className='text-area-b'>
                        Text:
                        <TextEditor 
                            text={this.props.sectionBHeading}
                            section='SECTION_B_HEADING'
                            handleTextChange={this.props.handleTextChange}
                        />
                    </label>
 
                    <label>
                        <TextEditor 
                            text={this.props.sectionBText}
                            section='SECTION_B_TEXT'
                            handleTextChange={this.props.handleTextChange}
                        />
                    </label>

                </form>
            </div>
        )
    }
}
