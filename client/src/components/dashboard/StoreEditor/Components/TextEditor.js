import React, {Component} from 'react'
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js'
import {convertToHTML} from 'draft-convert'
import ColorSample from './ColorSample'
import reactCSS from 'reactcss'

const styles = reactCSS({
    'default': {
        textEditor: {
            textAlign: 'left',
            border: '1px solid #000',
            background: '#efefef',
            padding: '2px',
            borderRadius: '5px',
        },
        textArea: {
            border: '1px solid #000',
            background: '#fff',
            padding: '3px',
            width: '100%',
            height: 'auto',
            textAlign: 'left',
            cursor: 'text',
            marginTop: '2px'         
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        button: {
            height: '1.5em',
            width: '1.5em'
        },
         colorSample: {
            border: '1px solid grey',            
            height: '1.5em',
            width: '1.5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        fontSize: {
          height: '1.5em',
          width: '2em',
        }
    }
})

export default class TextEditor extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: this.props.text,
            editorState: EditorState.createWithContent(ContentState.createFromText(this.props.text))
        }

    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    
        if(newState) {
            this.onChange(newState);
            return 'handled'
        }
        return 'not-handled'
    }

    onChange = (editorState) => {
        this.setState({
            editorState: editorState,
            text: convertToHTML(editorState.getCurrentContent())
        }, () => this.props.handleTextChange(this.state.text, this.props.section))
    }

    onItalicClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
    }

    onBoldClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    }

    render() {
        return (
            <div style={styles.textEditor}>
                <div style={styles.buttonsContainer}>
                    <button style={styles.button} onClick={this.onItalicClick}><em>I</em></button>
                    <button style={styles.button} onClick={this.onUnderlineClick}><u>U</u></button>
                    <button style={styles.button} onClick={this.onBoldClick}><strong>B</strong></button>
                    <div style={styles.colorSample}>
                        <ColorSample
                            color={this.props.color}
                            elem={this.props.section}
                            handleColorChange={this.props.handleColorChange}
                        />
                    </div>
                    <input 
                        type="number" 
                        value={this.props.fontSize}
                        min='16'
                        max='44'
                        style={styles.fontSize}
                        onChange={(e) => this.props.handleFontSizeChange(e.target.value, this.props.section)} 
                    />
                    
                </div>
                <div style={styles.textArea}>
                    <Editor 
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                </div>
            </div>
        )
    }
}