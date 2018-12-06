import React, { Component } from 'react'
import * as d3 from 'd3'

export default class PieChart extends Component {
    constructor(props){
        super(props)

        this.state = {
            width: 175,
            height: 175,
        }
    }

    slice= (pie) =>{

        let arc = d3.arc()
            .innerRadius(50)
            .outerRadius(80)

        //let interpolate = d3.interpolateRgb('#eaaf79', '#33bc51')
        let colors = ['rgb(243, 195, 92)', 'rgb(33, 182, 245)', 'rgb(231, 69, 69)', 'rgb(97, 202, 97)']

        return pie.map((slice, index) => {
            //let sliceColor = interpolate(index / (pie.length -1))
            let sliceColor = colors[index]
            return <path d={arc(slice)} fill={sliceColor} />
        })
    }

    render() {
        let pie = d3.pie()(this.props.data)
        return (
            <div>
                <svg height={this.state.height} width={this.state.width}>
                    <g transform={`translate(${this.state.width/2}, ${this.state.height/2})`}>
                        {this.slice(pie)}
                    </g>
                </svg>            
            </div>
        )
    }
}