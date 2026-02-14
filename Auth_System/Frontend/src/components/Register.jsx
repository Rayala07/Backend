import React, { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const Register = () => {
  return (
    <div className='flex flex-col gap-4 justify-between items-center bg-[#48484850] backdrop-blur-sm px-6 py-2 h-96 rounded-lg'>
      <p className='text-[1.8rem] font-semibold'>Signup Now</p>
      <InputFields />
      <p>Have an account ? <Link to="/signin" className='text-blue-800'>Sign In.</Link></p>
    </div>
  )
}

const InputFields = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function postUserData() {
        await axios.post("http://localhost:3000/api/auth/register", {
            username: username,
            email: email,
            password: password
        })
    }

    const submitRegisterForm = (e) => {
        e.preventDefault()

        postUserData()
        setEmail("")
        setUsername("")
        setPassword("")
        console.log("Submitted")
    }
    
    return (
        <form className='flex flex-col gap-5 items-center' onSubmit={submitRegisterForm}>
            <div className='flex flex-col justify-items-start gap-4 w-[16rem]'>
                <input 
                className='bg-[#212121da] text-white/80 outline-none rounded-sm p-[0.35rem] text-[0.90rem]'
                type="email" 
                value={email}
                onChange={(e) => (setEmail(e.target.value))}
                placeholder='email'
                />

                <input 
                className='bg-[#212121da] text-white/80 outline-none rounded-sm p-[0.35rem] text-[0.90rem]'
                type="text" 
                value={username}
                onChange={(e) => (setUsername(e.target.value))}
                placeholder='username'
                />

                <input 
                className='bg-[#212121da] text-white/80 outline-none rounded-sm p-[0.35rem] text-[0.90rem]'
                type="password" 
                value={password}
                onChange={(e) => (setPassword(e.target.value))}
                placeholder='password'
                />
            </div>

            <div>
                <button className='px-12 py-1.5 bg-gray-800 text-white/60 rounded-sm cursor-pointer'>Sign Up</button>
            </div>        
        </form>
    )
}

export default Register
