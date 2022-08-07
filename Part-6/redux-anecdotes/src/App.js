import AnecdoteForm from './components/AnecdoteForm'
import AnecdotesList from './components/AnecdotesList'
import Notification from './components/Notification'

const App = () => {
    return (
        <div>
            <Notification />
            <AnecdotesList />
            <AnecdoteForm />
        </div>
    )
}

export default App
