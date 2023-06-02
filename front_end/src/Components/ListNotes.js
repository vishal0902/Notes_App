

function ListNotes(props) {




    return (
        props.notesArray.length ?
            props.notesArray.map((note, i) => {
                return (
                    <div id={note.title} key={i}  className="justify-center   space-x-5 py-3  flex-row flex">
                        <div className="h-60 w-60  relative  shadow-slate-900 shadow-2xl   text-white bg-slate-700 border-slate-700 rounded-lg border-2">
                            <div className="border-black bg-slate-800 text-2xl  pl-2 border-b-2 ">{note.title}</div>
                            <div className="text-lg pl-2  ">{note.body}</div>
                            <div className="absolute bottom-0 right-0"><img className="h-10 w-10" onClick={() => props.handleRemove(note.title)} src="delete.svg"/></div>
                        </div>
                    </div>
                )
            }) :
            <div className="">
                <h3 className=" mt-5 h-10 w-40 text-center  shadow-slate-900 shadow-2xl  text-white bg-slate-600  border-slate-700 rounded-lg border-2">No notes to display</h3>
            </div>
    )

}

export default ListNotes
