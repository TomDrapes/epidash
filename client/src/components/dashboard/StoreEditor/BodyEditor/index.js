import React, { Component } from 'react'
import reactCSS from 'reactcss'
import axios from 'axios'
import style from './style.scss'

export default class BodyEditor extends Component {
    constructor(props){
        super(props)

        this.state = {
          imageA: null,
          imageAUrl: '',
          imageB: null,
          imageBUrl: '',
          sectionAHeading: this.props.sectionAHeading,
          sectionAText: this.props.sectionAText,
          sectionBHeading: this.props.sectionBHeading,
          sectionBText: this.props.sectionBText
        }
    }

    handleSelectedFile = (e, section) => {
      let imageUrl = URL.createObjectURL(e.target.files[0])
      switch (section) {
        case 'A': this.setState({ imageA: e.target.files[0], imageAUrl: imageUrl})
        break
        case 'B': this.setState({ imageB: e.target.files[0], imageBUrl: imageUrl })
        break
        default: break
      }
      this.props.updateBodyImages(imageUrl, section)
    }

    handleUpload = (file) => {
      const data = new FormData()
      data.append('file', file, file.name)
      data.append('userId', this.props.userId)
      axios.post(`/api/account/images/upload/${this.props.userId}`, data)
        .then(res => console.log(res.statusText))
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
                            onChange={(e) => this.handleSelectedFile(e, 'A')}
                        />
                        <button type='button' onClick={() => this.handleUpload(this.state.imageA)}>Upload</button>
                    </label>

                    <label className='text-area-a'>
                        Text:
                        <textarea className='text-area-heading'
                            value={this.state.sectionAHeading}
                            onChange={(e) => this.setState({ sectionAHeading: e.target.value })}
                        />
                        <button type='button' onClick={() => this.props.handleTextChange(this.state.sectionAHeading, 'SECTION_A_HEADING')}>Submit</button>
                        <textarea className='text-area'
                            value={this.state.sectionAText}
                            onChange={(e) => this.setState({ sectionAText: e.target.value })}
                        />
                        <button type='button' onClick={() => this.props.handleTextChange(this.state.sectionAText, 'SECTION_A_TEXT')}>Submit</button>
                    </label>

                    <h2>Section-B</h2>
                    <label className='sectionB-image-select'>
                        Image B:
                        <input
                            type='file'
                            accept='image/png, image/jpeg'
                            onChange={(e) => this.handleSelectedFile(e, 'B')}
                        />
                        <button type='button' onClick={() => this.handleUpload(this.state.imageB)}>Upload</button>
                    </label>

                    <label className='text-area-b'>
                        Text:
                        <textarea className='text-area-heading'
                            value={this.state.sectionBHeading}
                            onChange={(e) => this.setState({ sectionBHeading: e.target.value })}
                        />
                        <button type='button' onClick={() => this.props.handleTextChange(this.state.sectionBHeading, 'SECTION_B_HEADING')}>Submit</button>
                        <textarea className='text-area'
                            value={this.state.sectionBText}
                            onChange={(e) => this.setState({ sectionBText: e.target.value })}
                        />
                        <button type='button' onClick={() => this.props.handleTextChange(this.state.sectionBText, 'SECTION_B_TEXT')}>Submit</button>
                    </label>
                </form>
            </div>
        )
    }
}
