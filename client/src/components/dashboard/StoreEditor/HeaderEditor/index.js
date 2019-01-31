import React, { Component } from 'react'
import ColorSample from '../Components/ColorSample'
import TextEditor from '../Components/TextEditor'
import ImageUploader from '../Components/ImageUploader'
import './style.scss'

export default class HeaderEditor extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }    

    render(){
        return (
            <div>
                
                <div className='header-editor-section'>
                        <div>
                            <form>

                                <h2>MENU:</h2>
                                <label className='menu-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='24' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'MENU')}/>
                                </label>

                                <label className='menu-font-color-select'>
                                    Font-Color:
                                    <ColorSample 
                                        color={this.props.menuFontColor}
                                        elem={'MENU_FONT'}
                                        handleColorChange={this.props.handleColorChange}
                                    />                                                              
                                </label>

                                <h2>HEADING:</h2>
                                <label className='heading-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'HEADING')}/>
                                </label>

                                <label className='heading-font-color-select'>
                                    Font-Color:
                                    <ColorSample 
                                        color={this.props.headingFontColor}
                                        elem={'HEADING_FONT'}
                                        handleColorChange={this.props.handleColorChange}
                                    />                                                                                                     
                                </label>
                                <label>
                                    Text:
                                    <TextEditor 
                                        text={this.props.headingText}
                                        section='MAIN_HEADING'
                                        handleTextChange={this.props.handleTextChange}
                                    />                                    
                                </label>                                                            

                                <h2>SUBHEADING:</h2>
                                <label className='sub-heading-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='44' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'SUBHEADING')} />                                       
                                </label>

                                <label className='sub-heading-font-color-select'>
                                    Font-Color:
                                    <ColorSample 
                                        color={this.props.subheadingFontColor}
                                        elem={'SUBHEADING_FONT'}
                                        handleColorChange={this.props.handleColorChange}
                                    />                                                                                                    
                                </label>
                                <label>
                                    Text:
                                    <TextEditor 
                                        text={this.props.subheadingText}
                                        section='MAIN_SUBHEADING'
                                        handleTextChange={this.props.handleTextChange}
                                    />                                    
                                </label>

                                <h2>BUTTON:</h2>
                                <label className='button-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='24' onChange={(e) => this.props.handleFontSizeChange(e.target.value, 'HEADING_BUY_NOW_BUTTON')}/>
                                </label>
                                <label className='button-font-color-select'>
                                    Font-Color:
                                    <ColorSample 
                                        color={this.props.buttonFontColor}
                                        elem={'BUTTON_FONT'}
                                        handleColorChange={this.props.handleColorChange}
                                    />                                                                        
                                </label>
                                <label className='button-color-select'>
                                    Background-Color:
                                    <ColorSample 
                                        color={this.props.buttonBgColor}
                                        elem={'BUTTON_BG'}
                                        handleColorChange={this.props.handleColorChange}
                                    /> 
                                </label>

                                BACKGROUND:
                                <label className='bg-select'>
                                    <ImageUploader 
                                        userId={this.props.userId} 
                                        image='HERO_IMAGE' 
                                        updateImage={this.props.updateImage} 
                                    />                                   
                                </label>                                
                            </form>
                            
                        </div>
                </div>
            </div>
        )
    }
}