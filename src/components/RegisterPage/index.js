import { registerThunk } from '../../thunks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [serverError, setServerError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const register = async (e) => {
        e.preventDefault()
        try {
            const res = await dispatch(registerThunk({ email, name, password }))
            if (res.meta.rejectedWithValue) {
                setServerError(res.payload.message)
                return
            } else {
                navigate('/')
            }
            
        } catch (err) {
            console.log(err)
            setServerError(err.response.data.message)
        }
    }

    return (
        <div className="h-screen min-h-screen max-h-screen bg-gray-200 flex justify-center items-center p-4">
            <div className="bg-white shadow w-full p-4 rounded shadow-2xl text-gray-700 sm:w-96">

                <p className="text-center pb-2 text-3xl">Welcome</p>

                <form action="#" className="my-5">
                    <div className="pb-5 text-sm text-center">
                        <p>Already have an account? <a href="/login" className="text-red-500">Go ahead and log in.</a></p>
                    </div>

                    <div className="pb-5">
                        {/* <input type="text" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Password" /> */}
                        <input type="text" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="pb-5">
                        {/* <input type="email" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="email"/> */}
                        <input type="email" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="pb-5">
                        {/* <input type="text" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Password" /> */}
                        <input type="password" className="block w-full p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="pb-5 text-right text-sm">
                        <p className='text-red-500 text-sm'>{serverError}</p>

                    </div>

                    {/* <button type="submit" className="bg-red-500 p-2 w-full text-white rounded">LogIn</button> */}
                    <button type="submit" className="w-full p-2 rounded custom-btn btn-5 text-red-500 bg-red-500" onClick={register}><span>Register</span></button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage