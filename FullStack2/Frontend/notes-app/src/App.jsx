import Notes from "./components/Notes"
import "./index.css"

const App = () => {
  return (
    <div className='min-h-screen w-full  bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white/90 flex items-center justify-center p-6'>
      <Notes />
    </div>
  )
}

export default App
