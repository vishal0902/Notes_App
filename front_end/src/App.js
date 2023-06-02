import { useEffect, useState } from 'react'

import './App.css'
import ListNotes from './Components/ListNotes'



export const App = () => {

    // const [note, setNote] = useState({})

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")



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
        const response = await fetch("http://localhost:5000/note", {
            method: "get"
        })

        const responseJson = await response.json()
        console.log(responseJson)
        setNotesArray([...responseJson])

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const note = {
            title: title.trim(),
            body: body.trim()
        }

        
        try {
            notesArray.forEach(element => {
                if(element.title === note.title){
                    throw new Error('Duplicate Title')
                }
            });
            
            await fetch("http://localhost:5000/note", {
                method: "post",
                body: JSON.stringify(note),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            loadNotes()
        } catch (error) {
            alert(error)
        }
        setBody("")
        setTitle("")
        document.getElementById('title').focus();


    }


    const handleRemove = async (title) => {
        const Url = `http://localhost:5000/note/${title}`

        document.getElementById(title).className = "justify-center text-decoration-line: line-through space-x-5 py-3  flex-row flex"

        setTimeout(async () => {
            await fetch(Url, {
                method: "delete",

            })
            loadNotes()
            document.getElementById(title).className = "justify-center  space-x-5 py-3  flex-row flex"

        }, 200)

    }



    useEffect(() => {
        document.getElementById('title').focus();
        loadNotes()
    }, [])



    return (
        <div className="font-display  justify-center flex flex-col from-neutral-800 antialiased font-medium">
            <div className='font-extrabold text-white mb-5 font-custom justify-center flex flex-row text-4xl'>Notes App 1.0.0</div>
            <form onSubmit={handleSubmit}>
                <div className='relative'>
                    <div className='  justify-center space-x-3 flex flex-row'>
                        
                        <input id='title' placeholder='Title' value={title} className='w-52  shadow-lg shadow-slate-700  px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg'  type="text" name="title" onChange={handleTitleInput} />
                        </div>
                    <div className=' justify-center space-x-3 mt-4 h-40 flex flex-row'>
                        
                        <textarea placeholder='Type your notes here...' value={body} className=' w-52 h-40 shadow-lg shadow-slate-700  px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg'  type="text" name="body" onChange={handleBodyInput} />
                    </div>
                    <div className='justify-center relative flex mt-5'>
                    <input type="submit" className=' hover:bg-slate-100 justify-center hover:text-black  shadow-xl shadow-slate-700  px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg' value="Save Note" />
                    </div>
                </div>
                <div className=' flex justify-center flex-wrap space-x-3 '>
                    <ListNotes handleRemove={handleRemove} notesArray={notesArray} />
                </div>
            </form>
        </div>
    )

}

export default App;