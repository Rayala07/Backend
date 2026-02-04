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

    async function handleDelete(id) {
        const res = await axios.delete(`http://localhost:3000/api/notes/${id}`)
        fetchNotes();
        console.log(res)
    }

    const [modalState, setModalState] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null)

    const [editTitle, setEditTitle] = useState("");
    const [editDesc, setEditDesc] = useState("")

    function handleEdit(id) {
            const note = notes.find((note) => note._id === id)
            setSelectedNote(note)
            setEditTitle(note.title)
            setEditDesc(note.description)
            setModalState((prev) => prev = !prev)
    }

    async function handleSave(e) {
        e.preventDefault()
        
        await axios.patch(`http://localhost:3000/api/notes/${selectedNote._id}`,{
            title: editTitle,
            description: editDesc
        })

        fetchNotes()
        setModalState(prev => prev = !prev)
        setSelectedNote(null)
    }

  return (
    <>
    <div className='flex flex-col gap-10'>
        <NoteInput fetchNotes={fetchNotes}/>
        <div className='flex flex-col gap-4'>
        {notes.map((note) => {
            return (
                <div key={note._id} className='border w-fit p-4 flex flex-col gap-1'>
                    <h2>{note.title}</h2>
                    <h3>{note.description}</h3>
                    <div className='flex gap-4'>
                        <button className='bg-slate-300 px-1.5 py-[0.10rem] text-black/50 rounded-sm cursor-pointer self-start' onClick={() => (handleDelete(note._id))}>Delete</button>
                        <button className='bg-slate-300 px-1.5 py-[0.10rem] text-black/50 rounded-sm cursor-pointer self-start' onClick={() => (handleEdit(note._id))}>Edit</button>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
    {modalState && (
        <div id='modal'>
            <h3>Edit Note</h3>
            <form onSubmit={handleSave}>
                <input 
                    type="text" 
                    value={editTitle}
                    onChange={(e) => (setEditTitle(e.target.value))}
                />
                <input 
                    type="text"
                    value={editDesc}
                    onChange={(e) => (setEditDesc(e.target.value))} 
                />

                <button>Update</button>
                <button onClick={(e) => {
                    e.preventDefault()
                    setModalState(false)
                }}>Cancel</button>
            </form>
        </div>
    )}
    </>
  )
}

export default Notes
