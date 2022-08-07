import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdotesList = () => {
    const anecdotes = useSelector(({ anecdotes }) => {
        return [...anecdotes].sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    return (
        <>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => {
                                dispatch(upvoteAnec(anecdote.id))
                                dispatch(
                                    setNotification(`You voted for ${anecdote.content}`)
                                )
                                setTimeout(() => {
                                    dispatch(setNotification(''))
                                }, 5000)
                            }}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdotesList
