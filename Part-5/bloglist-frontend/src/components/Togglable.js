import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const hidden = { display: visible ? 'none' : '' }
    const shown = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hidden}>
                <button id={props.id} onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={shown}>
                {props.children}
                <button onClick={toggleVisibility}> Cancel </button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
