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
            title: title,
            body: body
        }
        try {
            await fetch("http://localhost:5000/note", {
                method: "post",
                body: JSON.stringify(note),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            loadNotes()
        } catch (error) {

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

        }, 500)

    }



    useEffect(() => {
        document.getElementById('title').focus();
        loadNotes()
    }, [])



    return (
        <div className="font-serif max-w-6xl from-neutral-800 font-semibold ">
            <form onSubmit={handleSubmit}>
                <div className=''>
                    <div className=' justify-center space-x-3 flex flex-row'>
                        <span className='text-lg'>Enter note title</span>
                        <input id='title' value={title} className=' shadow-lg shadow-slate-700 ml-10 px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg'  type="text" name="title" onChange={handleTitleInput} />
                        <span className='text-lg'>Enter note body</span>
                        <input value={body} className=' shadow-lg shadow-slate-700 ml-10 px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg'  type="text" name="body" onChange={handleBodyInput} />
                    </div>
                    <div className='justify-center flex mt-5'>
                    <input type="submit" className=' shadow-xl shadow-slate-700 ml-10 px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg' value="Save Note" />
                    </div>
                </div>
                <div className='mt-10 flex justify-center flex-wrap space-x-3 '>
                    <ListNotes handleRemove={handleRemove} notesArray={notesArray} />
                </div>
            </form>
        </div>
    )

}

export default App;