import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

const SignIn = () => {
  return (
    <div className='flex flex-col gap-4 justify-between items-center bg-[#48484850] backdrop-blur-sm px-6 py-2 h-96 rounded-lg'>
      <p className='text-[1.8rem] font-semibold'>Sign In</p>
      <Inputs />
      <p>Don't have an account ? <Link to="/" className='text-blue-800'>Sign Up.</Link></p>
    </div>
  )
}

const Inputs = () => {

  const [userIdentifier, setUserIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  async function postUserData() {
    const {data} = await axios.post("http://localhost:3000/api/auth/login", {
      username: (userIdentifier.includes("@") ? "" : userIdentifier),
      email: (userIdentifier.includes("@") ? userIdentifier : ""),
      password: password
    })

    console.log(data);
  }

  const submitSignInForm = (e) => {
    e.preventDefault()

    if(userIdentifier === "" || password === "") {
      return alert("Please fill all the fields")
    } else {
      postUserData()
      setUserIdentifier("")
      setPassword("")
      console.log("Submitted")
      navigate("/")    
    }
  }

  return (
    <form className='flex flex-col gap-5 items-center' onSubmit={submitSignInForm}>
      <div className='flex flex-col justify-items-start gap-4 w-[16rem]'>
        <input 
        type="text" 
        value={userIdentifier}
        onChange={(e) => (setUserIdentifier(e.target.value))}
        placeholder='username/email'
        className='bg-[#212121da] text-white/80 outline-none rounded-sm p-[0.35rem] text-[0.90rem]'
        />
        <input 
        type="password" 
        value={password}
        onChange={(e) => (setPassword(e.target.value))}
        placeholder='password'
        className='bg-[#212121da] text-white/80 outline-none rounded-sm p-[0.35rem] text-[0.90rem]'
        />
      </div>

      <div>
        <button className='px-12 py-1.5 bg-gray-800 text-white/60 rounded-sm cursor-pointer'>Lets Go</button>
      </div>
    </form>
  )
}

export default SignIn
