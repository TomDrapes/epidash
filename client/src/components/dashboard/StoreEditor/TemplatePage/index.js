import React from 'react'

export default function TemplatePage(props) {
    return (
        <div> 
            {props.header}
            {props.body}
            {props.footer}
        </div>
    )    
}