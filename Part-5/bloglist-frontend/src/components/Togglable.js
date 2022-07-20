import React from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const hidden = { display : visible ? 'none' : '' }
    const shown = { display : visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hidden} >
                <button onClick={toggleVisibility} >{props.buttonLabel}</button>
            </div>
            <div style={shown} >
                {props.children}
                <button onClick={toggleVisibility} > Cancel </button>
            </div>
        </div>
    )

}

export default Togglable
