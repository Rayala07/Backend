import "../src/index.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./components/Register"
import SignIn from "./components/SignIn"

const App = () => {
  return (
    <BrowserRouter>
        <div className="bg-[url(./public/web_bg.jpeg)] h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center">
          <Routes>
            <Route path="/" element={<Register />}/>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
