import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = event => {
        event.preventDefault()

        const content = event.target.anec.value
        event.target.anec.value = ''

        if (content !== '') {
            dispatch(createAnec(content))
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

export default AnecdoteForm
