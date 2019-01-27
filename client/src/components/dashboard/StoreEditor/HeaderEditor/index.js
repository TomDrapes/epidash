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
            showMenuFontColorPicker: false,
            showHeadingFontColorPicker: false,
            showSubHeadingFontColorPicker: false,
            showButtonFontColorPicker: false
        }
    }

    render(){
        const styles = ReactCSS({
            'default': {
                menuFontColorSample: {
                    background: this.props.menuFontColor,
                    width: '10px',
                    height: '10px',
                },
                headingFontColorSample: {
                    background: this.props.headingFontColor,
                    width: '10px',
                    height: '10px',
                },
                subHeadingFontColorSample: {
                    background: this.props.subHeadingFontColor,
                    width: '10px',
                    height: '10px',
                }
            }
        })

        return (
            <div>
                
                <div className='header-editor-section'>
                        <div>
                            <ColorPicker color={this.state.headerColor} onChangeComplete={this.updateHeaderColor} /> 
                            <form>

                                MENU:
                                <label className='menu-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.menuFontSize} onChange={(e) => this.props.handleMenuFontSizeChange(e)}/>
                                </label>

                                <label className='menu-font-color-select'>
                                    Font-Color:this.state.
                                    <input type='text' value={this.props.menuFontColor} onChange={(e) => this.props.handleMenuFontColorChange(e)}/>
                                    <div style={styles.menuFontColorSample} onClick={() => this.setState({showMenuFontColorPicker: !this.state.showMenuFontColorPicker})} />
                                    {this.state.showMenuFontColorPicker ? <ColorPicker color={this.props.menuFontColor} onChangeComplete={this.props.updateMenuFontColor} />
                                    : null}                             
                                </label>

                                HEADING:
                                <label className='heading-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.headingFontSize} onChange={(e) => this.props.handleHeadingFontSizeChange(e)}/>
                                </label>

                                <label className='heading-font-color-select'>
                                    Font-Color:
                                    <input type='text' value={this.props.headingFontColor} onChange={(e) => this.props.handleHeadingFontColorChange(e)}/>
                                    <div style={styles.subHeadingFontColorSample} onClick={() => this.setState({showHeadingFontColorPicker: !this.state.showHeadingFontColorPicker})} />
                                    {this.state.showHeadingFontColorPicker ? <ColorPicker color={this.props.headingFontColor} onChangeComplete={this.props.updateHeadingFontColor} />
                                    : null}                             
                                </label>
                                <label className='heading-text-area'>
                                    Text:
                                    <textarea />
                                </label>

                                SUB-HEADING:
                                <label className='sub-heading-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.subHeadingFontSize} onChange={(e) => this.props.handleSubHeadingFontSizeChange(e)}/>
                                </label>

                                <label className='sub-heading-font-color-select'>
                                    Font-Color:
                                    <input type='text' value={this.props.subHeadingFontColor} onChange={(e) => this.props.handleSubHeadingFontColorChange(e)}/>
                                    <div style={styles.subHeadingFontColorSample} onClick={() => this.setState({showSubHeadingFontColorPicker: !this.state.showSubHeadingFontColorPicker})} />
                                    {this.state.showSubHeadingFontColorPicker ? <ColorPicker color={this.props.subHeadingFontColor} onChangeComplete={this.props.updateSubHeadingFontColor} />
                                    : null}                             
                                </label>
                                <label className='sub-heading-text-area'>
                                    Text:
                                    <textarea />
                                </label>

                                BUTTON:
                                <label className='button-font-size-select'>
                                    Font-Size:
                                    <input type='range' min='16' max='64' value={this.props.buttonFontSize} onChange={(e) => this.props.handleButtonFontSizeChange(e)}/>
                                </label>
                                <label className='button-font-color-select'>
                                    Font-Color:
                                    <input type='text' value={this.props.buttonFontColor} onChange={(e) => this.props.handleButtonFontColorChange(e)}/>
                                    <div style={styles.buttonFontColorSample} onClick={() => this.setState({buttonFontColorPicker: !this.state.showButtonFontColorPicker})} />
                                    {this.state.showButtonFontColorPicker ? <ColorPicker color={this.props.buttonFontColor} onChangeComplete={this.props.updateButtonFontColor} />
                                    : null} 
                                </label>
                                <label className='button-color-select'>
                                    Background-Color:
                                    <input type='text' value={this.props.buttonBgColor} onChange={(e) => this.props.handleButtonBgColorChange(e)}/>
                                    <div style={styles.buttoBgtColorSample} onClick={() => this.setState({buttonBgColorPicker: !this.state.showButtonBgColorPicker})} />
                                    {this.state.showButtoBgtColorPicker ? <ColorPicker color={this.props.buttonBgColor} onChangeComplete={this.props.updateButtonBgColor} />
                                    : null} 
                                </label>

                                BACKGROUND:
                                <label className='bg-select'>
                                    <input type='file' onChange={(e) => this.props.handleHeaderBgChange } />
                                </label>
                                
                            </form>
                        </div>
                </div>
            </div>
        )
    }
}