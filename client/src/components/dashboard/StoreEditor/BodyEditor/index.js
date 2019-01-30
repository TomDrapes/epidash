import React, { Component } from 'react'
import reactCSS from 'reactcss'
import axios from 'axios'
import style from './style.scss'

export default class BodyEditor extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render () {
        return (
            <div className='body-editor-section'>
                <form>
                    <h2>Section-A</h2>
                    <label className='sectionA-image-select'>
                        Image A:
                        <input 
                            type='file'
                            accept='image/png, image/jpeg'
                            onChange={(e) => this.handleSelectedFile(e)}
                        />
                        <button type='button' onClick={() => this.handleUpload()}>Upload</button>
                    </label>
                    <button type='button' onClick={() => this.handleUpload()}>Upload</button>
                    <label className='text-area-a'>
                        Text:
                        <textarea className='text-area-heading'
                            value={this.state.sectionAHeading}
                            onChange={(e) => this.setState({ sectionAHeading: e.target.value })}
                        />
                        <button type='button' onClick={() => this.props.handleTextChange(this.state.sectionAHeading, 'SECTION-A-HEADING')}>Submit</button>
                        <textarea className='text-area'
                            value={this.state.sectionAText}
                            onChange={(e) => this.setState({ sectionAText: e.target.value })}
                        />
                        <button type='button' onClick={() => this.props.handleTextChange(this.state.sectionAText, 'SECTION-A-TEXT')}>Submit</button>
                    </label>
                </form>
            </div>
        )
    }
}