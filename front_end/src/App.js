import { useEffect, useState } from 'react'

import './App.css'
import ListNotes from './Components/ListNotes'



export const App = () => {

    // const [note, setNote] = useState({})

    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")

    

    const [notesArray, setNotesArray] = useState([])


    // const handleInput = (e) => {
    //     setNote({
    //         ...note,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }
    const handleBodyInput = (e) => {
        setBody(e.target.value)
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
        const note = {
            title:title,
            body:body
        }
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
        setBody("")
        setTitle("")
        

    }


    const handleRemove = async (title) => {
        const Url = `http://localhost:5000/note/${title}`
        
        document.getElementById(title).className="justify-center text-decoration-line: line-through space-x-5 py-3  flex-row flex"
        
        setTimeout(async()=>{
            await fetch(Url,{
                    method:"delete",
                   
            })
            loadNotes()
            document.getElementById(title).className="justify-center  space-x-5 py-3  flex-row flex"

        },1000)
        
    }
 


    useEffect(() => {
        loadNotes()
    }, [])



    return (
        <div className="font-bold font-serif  justify-center space-x-3 flex flex-row">
            <form onSubmit = {handleSubmit}>
                <span className='m-10'>Enter note title</span>
                <input value={title} className='border-4 border-lime-500 text-center rounded-xl bg-lime-950 text-white' type="text" name="title" onChange={handleTitleInput} />
                <span className='m-10'>Enter note body</span>
                <input value={body} className='border-4 border-lime-500 text-center rounded-xl bg-lime-950 text-white '  type="text" name="body" onChange={handleBodyInput} />
                <input type="submit" className='border-4  ml-10 px-1 justify-center mx-1 border-solid bg-slate-300 rounded-md text-sm' value="Submit" />
                <div className='mt-10'>
                <ListNotes handleRemove = {handleRemove}  notesArray = {notesArray} />
                </div>
            </form>
        </div>
    )

}

export default App;