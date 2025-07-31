const Notification = ({ value }) => {
    if (!value) {
        return null
    }

    const { message, type } = value


    return (
        <div className={`notification ${type}`}>{message}</div>
    )
}

export default Notification