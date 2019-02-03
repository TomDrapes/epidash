import React, {Component} from 'react'
import ColorPicker from './ColorPicker'
import reactCSS from 'reactcss'

export default class ColorSample extends Component {
    constructor(props){
        super(props)

        this.state = {
            active: false,
        }

    }

    render(){
        const styles = reactCSS({
            'default': {
                colorSample: {
                    background: this.props.color,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000',
                    cursor: 'pointer'
                }
            }
        })
        return (
            <div>
                <div 
                    style={styles.colorSample} 
                    onClick={() => this.setState({active: !this.state.active})} 
                />
    
                {this.state.active ? 
                    <ColorPicker 
                        color={this.props.color} 
                        onChangeComplete={(e) => this.props.handleColorChange(e, this.props.elem)} 
                    />
                : null} 
            </div>
        )
    }
}