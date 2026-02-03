import React, { useEffect, useState } from 'react'
import axios from 'axios'

const NoteInput = ({fetchNotes}) => {
    const inputBG = "bg-slate-300 text-black/80 px-2 py-1 rounded-sm";

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    async function postAndFetchData() {
        await axios.post("http://localhost:3000/api/notes", {
            title: title,
            description: desc
        })
        fetchNotes();
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        postAndFetchData();

        setTitle("")
        setDesc("")
    }

    return (
        <form className='flex gap-6' onSubmit={handleSubmit}>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
            className={`${inputBG}`} 
            />
            <input 
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} 
            placeholder='Enter note description'
            className={`${inputBG}`}
            />
            <button>Add Note</button>
        </form>
    )
}

const Notes = () => {

    const [notes, setNotes] = useState([])

    const fetchNotes = async() => {
        const {data} = await axios.get("http://localhost:3000/api/notes")
        setNotes(data.getNotes)
    }

    useEffect(() => {
    fetchNotes()
    },[])

  return (
    <div className='flex flex-col gap-10'>
        <NoteInput fetchNotes={fetchNotes}/>
        <div className='flex flex-col gap-4'>
        {notes.map((note) => {
            return (
                <div key={note._id} className='border w-fit p-4'>
                    <h2>{note.title}</h2>
                    <h3>{note.description}</h3>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default Notes
