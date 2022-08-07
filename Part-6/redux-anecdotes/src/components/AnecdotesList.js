import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnec } from '../reducers/anecdoteReducer'

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
                        <button onClick={() => dispatch(upvoteAnec(anecdote.id))}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdotesList
