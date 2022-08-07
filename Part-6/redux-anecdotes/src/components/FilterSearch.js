import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/searchReducer'

const FilterSearch = () => {
    const dispatch = useDispatch()

    const handleChange = event => {
        const searchTerm = event.target.value
        const backSlash = /\\/g
        if (backSlash.test(searchTerm) === true) {
            dispatch(setNotification('Backslash (\\) is not allowed.'))
            setTimeout(() => {
                dispatch(setNotification(''))
            }, 5000)
            return
        }
        dispatch(setFilter(searchTerm))
    }

    const style = {
        marginBottom: 10,
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default FilterSearch
