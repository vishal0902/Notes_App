import { useEffect, useState } from 'react'
import Notes from './Components/Notes'



export const App = () => {

    const [note, setNote] = useState({})

    

    const [notesArray, setNotesArray] = useState([])


    const handleInput = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }


    const loadNotes = async () => {
        const response = await fetch("http://localhost:5000/note",{
            method:"get"
        })

        const responseJson = await response.json()
        console.log(responseJson)
        setNotesArray([...responseJson])

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch("http://localhost:5000/note",{
                method:"post",
                body: JSON.stringify(note),
                headers: {
                    "Content-Type":"application/json"
                }
            })
            loadNotes()
        } catch (error) {
            
        }

    }

 


    useEffect(() => {
        loadNotes()
    }, [])



    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <span>Enter note title</span>
                <input type="text" name="title" onChange={handleInput} />
                <span>Enter note body</span>
                <input type="text" name="body" onChange={handleInput} />
                <input type="submit" value="Submit" />
               {
                notesArray.length ?
                notesArray.map((note,i)=>{
                    return <Notes key = {i} title={note.title} body = {note.body} />
                }) :
                    <h3>No notes to display</h3>
               }
            </form>
        </div>
    )
}

export default App;