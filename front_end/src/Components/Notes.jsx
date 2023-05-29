const Notes = (props) => {
    
    const spanStyle ={
        marginRight : "10px"
    }
    
    
    return (<>
        <div>
        <span style={spanStyle}>Title: {props.title}</span>
        <span style={spanStyle}>Body: {props.body}</span>
        </div>
    </>)
}

export default Notes;