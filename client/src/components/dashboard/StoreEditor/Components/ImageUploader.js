import React, {Component} from 'react'
import axios from 'axios';

export default class ImageUploader extends Component {
    constructor(props){
        super(props)

        this.state = {
            image: null,
            imageURL: null
        }
    }

    handleSelectedFile = (e, image) => {
        let imageURL = URL.createObjectURL(e.target.files[0])
        this.setState({ image: e.target.files[0], imageURL: imageURL})
        this.props.updateImage(imageURL, image)
    }

    handleUpload = (file) => {
        const data = new FormData()
        data.append('file', file, file.name)
        data.append('userId', this.props.userId)
        axios.post(`/api/account/images/upload/${this.props.userId}`, data)
            .then(res => console.log(res.statusText))
    }

    render(){
        return (
            <div>
                <input
                    type='file'
                    accept='image/png, image/jpeg'
                    onChange={(e) => this.handleSelectedFile(e, this.props.image)}
                />
                <button 
                    type='button' 
                    onClick={() => this.handleUpload(this.state.image)}
                >Upload</button>
            </div>
        )
    }
}