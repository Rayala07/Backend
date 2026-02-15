import "../src/index.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./components/Register"
import SignIn from "./components/SignIn"
import Home from "./components/Home"

const App = () => {
  return (
    <BrowserRouter>
        <div className="bg-[url(/web_bg.jpeg)] h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<Register />}/>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
