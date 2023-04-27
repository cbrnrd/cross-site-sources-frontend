import {changePasswordThunk, getArticle, registerThunk} from '../../thunks'
import {getUserThunk, changeEmailThunk} from "../../thunks";
import {useEffect, useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setPassword] = useState('')
    const [serverError, setServerError] = useState('')
    const { isLoggedIn, jwt, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const changeEmail = async (e) => {
        e.preventDefault()
        try {
            const res = await dispatch(changeEmailThunk({ userId, email }))
            console.log("res:: ", res)
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
    const changePassword = async (e) => {
        e.preventDefault()
        try {
            const res = await dispatch(changePasswordThunk({userId, newPassword}))
            console.log("res:: ", res)
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

    // Not entirely sure what I'm doing
    let { userId, user } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUserThunk(userId))
    }, [])

    if (! isLoggedIn) {
        return <Navigate to="/login" />
    }

    return (
        <div className="h-screen min-h-screen max-h-screen bg-gray-200 flex justify-center items-center p-4">
            <div className="bg-white shadow w-full p-4 rounded shadow-2xl text-gray-700 sm:w-96">

                <p className="text-center pb-2 text-3xl">Profile</p>

                <div className="pb-5 my-5">
                    <p>Current User: {user.name}</p>
                    <p>Current Email: {user.email}</p>
                    <p>Current Role: {user.role}</p>
                </div>

                {/* Form is currently bugged, tries to run the function on any input */}
                <form action="#" className="pb-5">
                    <div className="pb-5">
                        <p className="text-center"> Change Email</p>
                        {/* m-0 doesn't seem to work, removed block*/}
                        <input type="text" className="w-3/4 p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="New Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {/*Change register to changePass once working*/}
                        <button type="submit" className="w-1/4 p-2 rounded custom-btn btn-5 text-red-500 bg-red-500" onClick={changeEmail}><span>Change</span></button>
                    </div>
                    <div className="pb-5">
                        <p className="text-center"> Change Password</p>
                            {/* m-0 doesn't seem to work, removed block*/}
                            <input type="password" className="w-3/4 p-2 rounded shadow bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none" placeholder="New Password" value={newPassword} onChange={(e) => setPassword(e.target.value)} />
                            {/*Change register to changePass once working*/}
                            <button type="submit" className="w-1/4 p-2 rounded custom-btn btn-5 text-red-500 bg-red-500" onClick={changePassword}><span>Change</span></button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default ProfilePage