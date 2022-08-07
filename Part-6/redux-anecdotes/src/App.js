import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnec, createAnec } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
    const dispatch = useDispatch()

    const addAnec = event => {
        event.preventDefault()

        const content = event.target.anec.value
        event.target.anec.value = ''

        dispatch(createAnec(content))
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(upvoteAnec(anecdote.id))}>vote</button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
            <form onSubmit={addAnec}>
                <div>
                    <input name='anec' />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App
