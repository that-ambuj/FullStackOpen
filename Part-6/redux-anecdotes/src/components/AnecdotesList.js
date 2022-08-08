import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import FilterSearch from './FilterSearch'

const AnecdotesList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        let searchRegex = new RegExp(filter.value, 'gi')
        const result = [...anecdotes].filter(anec => searchRegex.test(anec.content))

        return result.sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    return (
        <>
            <h2>Anecdotes</h2>
            <FilterSearch />
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => {
                                dispatch(upvoteAnec(anecdote.id))
                                dispatch(
                                    setNotification(
                                        `You voted for ${anecdote.content}`,
                                        5
                                    )
                                )
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
