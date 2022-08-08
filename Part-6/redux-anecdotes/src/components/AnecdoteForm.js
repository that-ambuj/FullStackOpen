import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
    const addAnec = async event => {
        event.preventDefault()

        const content = event.target.anec.value
        event.target.anec.value = ''

        if (content !== '') {
            props.createAnec(content)
            props.setNotification(`${content} created.`, 5)
        }
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div>
                    <input name='anec' />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default connect(null, { createAnec, setNotification })(AnecdoteForm)
