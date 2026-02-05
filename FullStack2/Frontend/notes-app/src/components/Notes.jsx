import React, { useEffect, useState } from 'react'
import axios from 'axios'

const NoteInput = ({fetchNotes}) => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    async function postAndFetchData() {
        await axios.post("https://notes-pjwh.onrender.com/api/notes", {
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
        <form 
        className='flex flex-col sm:flex-row gap-3 bg-white/5 p-4 rounded-xl border border-white/10' 
        onSubmit={handleSubmit}>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter title'
            className="flex-1 bg-slate-900/80 border border-white/10 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500
            transition duration-200"
            />
            <input 
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} 
            placeholder='Enter note description'
            className="flex-1 bg-slate-900/80 border border-white/10 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-indigo-500
            transition duration-200"
            />
            <button
            className='bg-indigo-600 hover:bg-indigo-700 transition duration-200 px-5 py-2 rounded-md font-medium cursor-pointer'>
                Add Note
            </button>
        </form>
    )
}

const Notes = () => {

    const [notes, setNotes] = useState([])

    const fetchNotes = async() => {
        const {data} = await axios.get("https://notes-pjwh.onrender.com/api/notes")
        setNotes(data.getNotes)
    }

    useEffect(() => {
    fetchNotes()
    },[])

    async function handleDelete(id) {
        const res = await axios.delete(`https://notes-pjwh.onrender.com/api/notes/${id}`)
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
        
        await axios.patch(`https://notes-pjwh.onrender.com/api/notes/${selectedNote._id}`,{
            title: editTitle,
            description: editDesc
        })

        fetchNotes()
        setModalState(prev => prev = !prev)
        setSelectedNote(null)
    }

  return (
    <>
    <div className='w-full max-w-5xl bg-white/5 border backdrop-blur-2xl border-white/10 rounded-2xl p-6 shadow-2xl'>
        <NoteInput fetchNotes={fetchNotes}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        {notes.map((note) => {
            return (
                <div key={note._id} className='bg-slate-900/70 border border-white/10 rounded-xl p-4 flex flex-col gap-2 shadow hover:shadow-lg transition duration-200'>
                    <h2 className='text-lg font-semibold text-white'>{note.title}</h2>
                    <h3 className='text-sm text-white/70'>{note.description}</h3>
                    <div className='flex gap-2 mt-3'>
                        <button className='text-sm bg-red-500/10 text-red-400 px-3 py-1 rounded-md hover:bg-red-500/20 transition duration-200 cursor-pointer' onClick={() => (handleDelete(note._id))}>Delete</button>
                        <button className='text-sm bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-md hover:bg-indigo-500/20 transition duration-200 cursor-pointer' onClick={() => (handleEdit(note._id))}>Edit</button>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
    {modalState && (
        <div id='modal' className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-slate-900 border border-white/10 rounded-xl p-6 w-full max-w-md space-y-4'>
                <h3 className='text-xl font-semibold'>Edit Note</h3>
                <form 
                className='flex flex-col gap-3'
                onSubmit={handleSave}
                >
                <input 
                    type="text" 
                    value={editTitle}
                    onChange={(e) => (setEditTitle(e.target.value))}
                    className='bg-slate-800 border border-white/10 px-3 py-2 rounded-md'
                />
                <input 
                    type="text"
                    value={editDesc}
                    onChange={(e) => (setEditDesc(e.target.value))}
                    className='bg-slate-800 border border-white/10 px-3 py-2 rounded-md' 
                />
                <div className='flex justify-end gap-3 mt-2'>
                    <button className='bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200'>Update</button>

                    <button onClick={(e) => {
                    e.preventDefault()
                    setModalState(false)
                    }}
                    className='px-4 py-2 text-white/60 hover:text-white transition duration-200'>
                        Cancel
                    </button>
                </div>
            </form>
            </div>
        </div>
    )}
    </>
  )
}

export default Notes
