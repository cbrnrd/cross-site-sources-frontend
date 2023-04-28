import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postCommentThunk } from "../../thunks";
import { useParams } from "react-router-dom";

const CommentBox = ({ articleId }) => {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.user)


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(postCommentThunk({comment, articleId}));
        setComment("");
    }

    return (
        <>

            {
                isLoggedIn ? (
                    <div className="flex justify-center p-10">
                        <div className="flex flex-col items-center justify-center w-1/2 h-full">
                            <h2>Leave a comment!</h2>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    className="border-2 border-gray-300 p-2 w-full rounded focus:outline-none focus:border-red-500 transition duration-300"
                                    placeholder="Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-red-500 p-2 w-full text-white rounded hover:bg-red-600 hover:shadow-lg transition duration-300"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center p-10">
                        <div className="flex flex-col items-center justify-center w-1/2 h-full">
                            <h2>Log in to leave a comment!</h2>
                        </div>
                    </div>
                )
            }
        </>

    );
}

export default CommentBox;