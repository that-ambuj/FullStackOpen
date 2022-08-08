import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setFilter } from '../reducers/searchReducer'

const FilterSearch = props => {
    const handleChange = event => {
        const searchTerm = event.target.value
        const backSlash = /\\/g
        if (backSlash.test(searchTerm) === true) {
            props.setNotification('Backslash (\\) is not allowed.', 5)
            return
        }
        props.setFilter(searchTerm)
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

export default connect(null, { setNotification, setFilter })(FilterSearch)
