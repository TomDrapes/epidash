import React, { Component } from 'react'
import ColorPicker from '../ColorPicker'
import ReactCSS from 'reactcss'
import './style.scss'

export default class HeaderEditor extends Component {
    constructor(props){
        super(props)

        this.state = {
            showMenuFontColorPicker: false,
            showHeadingFontColorPicker: false,
            showSubHeadingFontColorPicker: false,
            showButtonFontColorPicker: false,
            showButtonBgColorPicker: false,
            headingText: this.props.headingText,
        }
    }

    render(){
        const styles = ReactCSS({
            'default': {
                menuFontColorSample: {
                    background: this.props.menuFontColor,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000'
                },
                headingFontColorSample: {
                    background: this.props.headingFontColor,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000'
                },
                subHeadingFontColorSample: {
                    background: this.props.subHeadingFontColor,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000'
                },
                buttonFontColorSample: {
                    background: this.props.buttonFontColor,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000'
                },
                buttonBgColorSample: {
                    background: this.props.buttonBgColor,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000'
                }
            }
        })

        return (
            <div>
                
                <div className='header-editor-section'>
                        <div>
                            <ColorPicker color={this.state.headerColor} onChangeComplete={this.updateHeaderColor} /> 
                            <form>

                                <h2>MENU:</h2>
                                <label className='menu-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.menuFontSize} onChange={(e) => this.props.handleFontSizeChange(e, 'MENU')}/>
                                </label>

                                <label className='menu-font-color-select'>
                                    Font-Color:
                                    <div className='menu-font-color-sample' style={styles.menuFontColorSample} onClick={() => this.setState({showMenuFontColorPicker: !this.state.showMenuFontColorPicker})} />
                                    {this.state.showMenuFontColorPicker ? <ColorPicker color={this.props.menuFontColor} onChangeComplete={(e) => this.props.handleColorChange(e, 'MENU_FONT')} />
                                    : null}                             
                                </label>

                                <h2>HEADING:</h2>
                                <label className='heading-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.headingFontSize} onChange={(e) => this.props.handleFontSizeChange(e, 'HEADING')}/>
                                </label>

                                <label className='heading-font-color-select'>
                                    Font-Color:                                    
                                    <div style={styles.headingFontColorSample} onClick={() => this.setState({showHeadingFontColorPicker: !this.state.showHeadingFontColorPicker})} />
                                    {this.state.showHeadingFontColorPicker ? <ColorPicker color={this.props.headingFontColor} onChangeComplete={(e) => this.props.handleColorChange(e, 'HEADING_FONT')} />
                                    : null}                             
                                </label>
                                <label>
                                    Text:
                                    <textarea className='heading-text-area' 
                                        value={this.state.headingText} 
                                        onChange={(e) => this.setState({headingText: e.target.value})} />
                                </label>
                                <div onClick={() => this.props.handleTextChange(this.state.headingText, 'HEADING')}>Submit</div>                                        
                                    

                                <h2>SUBHEADING:</h2>
                                <label className='sub-heading-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' 
                                        value={this.state.subHeadingFontSize} 
                                        onChange={(e) => this.setState({subHeadingText: e.value})} 
                                        />                                       
                                </label>

                                <label className='sub-heading-font-color-select'>
                                    Font-Color:                                   
                                    <div style={styles.subHeadingFontColorSample} onClick={() => this.setState({showSubHeadingFontColorPicker: !this.state.showSubHeadingFontColorPicker})} />
                                    {this.state.showSubHeadingFontColorPicker ? <ColorPicker color={this.props.subHeadingFontColor} onChangeComplete={(e) => this.props.handleColorChange(e, 'SUBHEADING_FONT')} />
                                    : null}                             
                                </label>
                                <label className='sub-heading-text-area'>
                                    Text:
                                    <textarea />
                                </label>

                                <h2>BUTTON:</h2>
                                <label className='button-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.buttonFontSize} onChange={(e) => this.props.handleButtonFontSizeChange(e)}/>
                                </label>
                                <label className='button-font-color-select'>
                                    Font-Color:                                    
                                    <div style={styles.buttonFontColorSample} onClick={() => this.setState({showButtonFontColorPicker: !this.state.showButtonFontColorPicker})} />
                                    {this.state.showButtonFontColorPicker ? <ColorPicker color={this.props.buttonFontColor} onChangeComplete={(e) => this.props.handleColorChange(e, 'BUTTON_FONT')} />
                                    : null} 
                                </label>
                                <label className='button-color-select'>
                                    Background-Color:
                                    <div style={styles.buttonBgColorSample} onClick={() => this.setState({showButtonBgColorPicker: !this.state.showButtonBgColorPicker})} />
                                    {this.state.showButtonBgColorPicker ? <ColorPicker color={this.props.buttonBgColor} onChangeComplete={(e) => this.props.handleColorChange(e, 'BUTTON_BG')} />
                                    : null} 
                                </label>

                                BACKGROUND:
                                <label className='bg-select'>
                                    <input type='file' onChange={(e) => this.props.handleHeroImageChange } />
                                </label>
                                
                            </form>
                            
                        </div>
                </div>
            </div>
        )
    }
}