import React, {Component} from 'react'
import ColorPicker from './ColorPicker'
import reactCSS from 'reactcss'

export default class ColorSample extends Component {
    constructor(props){
        super(props)

        this.state = {
            active: false,
            left: '50%',
            right: null,
            marginLeft: '-130px',
            marginRight: null
        }

    }

    componentDidMount(){
        if(this.props.position === 'RIGHT') 
            this.setState({ left: null, right: '50%', marginLeft: null, marginRight: '-130px'})
    }

    render(){

        const styles = reactCSS({
            'default': {
                colorSample: {
                    background: this.props.color,
                    width: '20px',
                    height: '20px',
                    border: '1px solid #000',
                    cursor: 'pointer',
                   
                },
                colorPicker: {
                    position: 'absolute',
                    zIndex: '1',
                    background: '#bdbdbd',
                    left: this.state.left,
                    right: this.state.right,
                    marginLeft: this.state.marginLeft,
                    marginRight: this.state.marginRight,
                    width: 'auto',
                    borderRadius: '5px',
                    marginTop: '10px',
                    boxShadow: '-5px 5px 5px 0px rgba(0,0,0,0.4)'
                },
                container: {
                    position: 'relative'
                },
                upArrow: {
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderBottom: '10px solid #bdbdbd',
                    position: 'absolute',
                    zIndex: '1',
                }
            }
        })
        return (
            <div style={styles.container}>
                <div 
                    style={styles.colorSample} 
                    onClick={() => this.setState({active: !this.state.active})} 
                />
    
                {this.state.active ? 
                    <div>
                        <div style={styles.upArrow} />
                        <div style={styles.colorPicker}>
                            <ColorPicker 
                                color={this.props.color} 
                                onChangeComplete={(e) => this.props.handleColorChange(e, this.props.elem)} 
                            />
                        </div>
                    </div>
                : null} 
            </div>
        )
    }
}