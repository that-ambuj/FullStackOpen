import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(({ notification }) => notification)

    const style = {
        border: '1px solid #AAA',
        padding: 10,
        borderRadius: 5,
    }
    return (
        <div style={{ ...style, display: notification === '' ? 'none' : 'block' }}>
            {notification}
        </div>
    )
}

export default Notification
