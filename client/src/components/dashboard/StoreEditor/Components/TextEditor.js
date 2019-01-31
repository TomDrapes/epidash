import React, {Component} from 'react'

export default class TextEditor extends Component {
    constructor(props){
        super(props)

        this.state = {
            text: this.props.text
        }
    }

    render() {
        return (
            <div>
                <textarea
                    value={this.state.text}
                    onChange={(e) => this.setState({ text: e.target.value })}
                />
                <button 
                    type='button' 
                    onClick={() => this.props.handleTextChange(this.state.text, this.props.section)}
                >Submit</button>
            </div>
        )
    }
}