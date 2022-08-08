import { connect } from 'react-redux'

const Notification = props => {
    const style = {
        border: '1px solid #AAA',
        padding: 10,
        borderRadius: 5,
    }
    return (
        <div style={{ ...style, display: props.notification === '' ? 'none' : 'block' }}>
            {props.notification}
        </div>
    )
}

export default connect(
    state => ({ notification: state.notification }),
    null
)(Notification)
