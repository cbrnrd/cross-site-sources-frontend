import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {getUserThunk} from "../../thunks";
import ProfilePage from "../ProfilePage";

const VisitProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // If the user is trying to view their own profile, kick them to the view own profile page
    let { userId, user, isLoggedIn } = useSelector(state => state.user)
    if (userId === id && isLoggedIn) {
        navigate("/profile")
    }
    if (!isLoggedIn) {
        navigate("/login")
    }

    useEffect(() => {
        dispatch(getUserThunk(id))
    }, [])

    return (
        <div className="h-screen min-h-screen max-h-screen bg-gray-200 flex justify-center items-center p-4">
            <div className="bg-white shadow w-full p-4 rounded shadow-2xl text-gray-700 sm:w-96">

                <p className="text-center pb-2 text-3xl">Profile</p>

                <div className="pb-5 my-5">
                    <p>Username: {user.name}</p>
                    <p>User's Email: {user.email}</p>
                </div>


            </div>
        </div>
    )

}

export default VisitProfilePage;