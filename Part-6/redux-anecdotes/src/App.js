import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdotesService from './services/anecdotesService'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        anecdotesService.getAll().then(anecs => dispatch(setAnecdotes(anecs)))
    }, [dispatch])

    return (
        <div>
            <Notification />
            <AnecdotesList />
            <AnecdoteForm />
        </div>
    )
}

export default App
