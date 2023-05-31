

function ListNotes(props) {




    return (
        props.notesArray.length ?
            props.notesArray.map((note, i) => {
                return (
                    <div id={note.title} key={i} onClick={() => props.handleRemove(note.title)} className="justify-center   space-x-5 py-3  flex-row flex">
                        <div className="h-60 w-60  shadow-slate-900 shadow-2xl  text-white bg-slate-600  border-slate-700 rounded-lg border-2">
                            <div className="border-black  pl-2 border-b-2 text-lg">{note.title}</div>
                            <div className=" pl-2">{note.body}</div>
                        </div>
                    </div>
                )
            }) :
            <h3 className="h-60 w-60 text-center  shadow-slate-900 shadow-2xl  text-white bg-slate-600  border-slate-700 rounded-lg border-2">No notes to display</h3>

    )

}

export default ListNotes
