

function ListNotes(props) {
    
    
    
    
    return(
        props.notesArray.length ?
        props.notesArray.map((note, i) => {
            return (
                <div id={note.title} key={i} onClick={()=>props.handleRemove(note.title)} className="justify-center   space-x-5 py-3  flex-row flex">
                    <div className="w-50">Title: {note.title}</div>
                    <div className="w-50">Body: {note.body}</div>
                </div>
            )
        }) :
        <h3 className="justify-center  space-x-5 py-3  flex-row flex">No notes to display</h3>

    )
    
}

export default ListNotes
