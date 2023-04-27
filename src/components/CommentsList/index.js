import { useSelector, useDispatch } from 'react-redux'
import { deleteCommentThunk } from '../../thunks'
import { useState, useEffect } from 'react'

const CommentsList = ({ comments }) => {
    //console.log(comments)
    const { userId, role } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const deleteComment = (commentId) => {
        dispatch(deleteCommentThunk({ commentId }))
        window.location.reload()
    }

    return (
        <>
            {/* rounded corners, drop shadow, and padding for each comment*/}
            <div className="flex justify-center p-10">
                <div className="w-1/2">
                    {comments.map((comment, index) => {
                        console.log(comment)
                        if (comment === null) return;
                        return (
                            <div key={index} className="flex justify-between rounded-lg shadow-md p-4 mb-4">
                                {/* Show comment author and content */}
                                <div>
                                    <h4 className="font-bold mb-2">{comment.username}</h4>
                                    <p className="text-gray-600">{comment.text}</p>
                                </div>
                                {/* Show delete button if user is the author of the comment */}
                                {(userId === comment.user || role === 'admin') && (
                                    <button onClick={() => deleteComment(comment._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"> Delete </button>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CommentsList
