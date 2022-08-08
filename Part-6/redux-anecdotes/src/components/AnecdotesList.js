import { connect } from 'react-redux'
import { upvoteAnec } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import FilterSearch from './FilterSearch'

const AnecdotesList = props => {
    return (
        <>
            <h2>Anecdotes</h2>
            <FilterSearch />
            {props.anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            onClick={() => {
                                props.upvoteAnec(anecdote.id)
                                props.setNotification(
                                    `You voted for ${anecdote.content}`,
                                    5
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

const mapStateToProps = state => {
    const { anecdotes, filter } = state

    let searchRegex = new RegExp(filter, 'i')
    const result = anecdotes
        .filter(anec => searchRegex.test(anec.content))
        .sort((a, b) => b.votes - a.votes)

    console.log(result)
    const sortedArr = result.sort((a, b) => b.votes - a.votes)

    return {
        anecdotes: sortedArr,
    }
}

const mapDispatchToProps = { upvoteAnec, setNotification }

export default connect(mapStateToProps, mapDispatchToProps)(AnecdotesList)
