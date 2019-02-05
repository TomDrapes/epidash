import React, { Component } from 'react'
import ColorSample from '../Components/ColorSample'
import TextEditor from '../Components/TextEditor'
import ImageUploader from '../Components/ImageUploader'
import './style.scss'

export default class HeaderEditor extends Component {
    render(){
        return (
            <div>
                
                <div className='header-editor-section'>
                    <h3>MENU:</h3>
                    <div className='editor-section'>
                        <div className='size-select'>
                            <h4>Font-Size:</h4>
                            <input type='range' min='16' max='24' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'MENU')}/>
                        </div>

                        <div className='color-select'>
                            <h4>Color:</h4>
                            <ColorSample 
                                color={this.props.menuFontColor}
                                elem={'MENU_FONT'}
                                handleColorChange={this.props.handleColorChange}
                                position='RIGHT'
                            />                                                            
                        </div>
                    </div>

                    <div className='text-area'>
                        <h3>HEADING:</h3>
                        <TextEditor 
                            text={this.props.headingText}
                            color={this.props.headingFontColor}
                            section='MAIN_HEADING'
                            handleTextChange={this.props.handleTextChange}
                            handleColorChange={this.props.handleColorChange}
                            handleFontSizeChange={this.props.handleFontSizeChange}
                            fontSize={this.props.headingFontSize}
                        />                                    
                    </div>                                                            

                    <div className='text-area'>
                        <h3>SUBHEADING:</h3>
                        <TextEditor 
                            text={this.props.subheadingText}
                            color={this.props.subheadingFontColor}
                            section='MAIN_SUBHEADING'
                            handleTextChange={this.props.handleTextChange}
                            handleColorChange={this.props.handleColorChange}
                            handleFontSizeChange={this.props.handleFontSizeChange}
                            fontSize={this.props.subheadingFontSize}
                        />                                    
                    </div>

                    <h3>BUTTON:</h3>
                    <div className='editor-section'>
                        <div className='size-select'>
                            <h4>Font-Size:</h4>
                            <input type='range' min='16' max='44' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'HEADING_BUY_NOW_BUTTON')}/>
                        </div>
                        <div className='color-select'>
                            <h4>Color:</h4>
                            <ColorSample 
                                color={this.props.buttonFontColor}
                                elem={'BUTTON_FONT'}
                                handleColorChange={this.props.handleColorChange}
                                position='RIGHT'
                            />                                                                        
                        </div>
                        <div className='color-select'>
                            <h4>Background-Color:</h4>
                            <ColorSample 
                                color={this.props.buttonBgColor}
                                elem={'BUTTON_BG'}
                                handleColorChange={this.props.handleColorChange}
                            /> 
                        </div>
                    </div>

                    <div className='bg-select'>
                        <h3>BACKGROUND:</h3>
                        <ImageUploader 
                            userId={this.props.userId} 
                            image='HERO_IMAGE' 
                            updateImage={this.props.updateImage} 
                        />                                   
                    </div>                                
                </div>
            </div>
        )
    }
}