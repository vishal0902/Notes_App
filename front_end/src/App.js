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

        }, 500)

    }



    useEffect(() => {
        document.getElementById('title').focus();
        loadNotes()
    }, [])



    return (
        <div className="font-display  justify-center flex from-neutral-800 antialiased font-medium">
            <form onSubmit={handleSubmit}>
                <div className='relative'>
                    <div className='  justify-center space-x-3 flex flex-row'>
                        <span className='w-40  text-white text-2xl'>Enter note title</span>
                        <input id='title' value={title} className='w-52  shadow-lg shadow-slate-700 ml-10 px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg'  type="text" name="title" onChange={handleTitleInput} />
                        </div>
                    <div className=' justify-center space-x-3 mt-4 h-40 flex flex-row'>
                        <span className='w-40 text-white  text-2xl'>Enter note body</span>
                        <textarea value={body} className=' w-52 h-40 shadow-lg shadow-slate-700 ml-10 px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg'  type="text" name="body" onChange={handleBodyInput} />
                    </div>
                    <div className='justify-center relative flex mt-5'>
                    <input type="submit" className=' hover:bg-slate-100 hover:text-black absolute right-14 shadow-xl shadow-slate-700 ml-10 px-1 border-4 border-slate-700 text-white mx-1 border-solid bg-slate-700 rounded-md text-lg' value="Save Note" />
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