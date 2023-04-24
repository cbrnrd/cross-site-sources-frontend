const CommentsList = ({ comments }) => {
    //console.log(comments)
    return (
        <>
            {/* rounded corners, drop shadow, and padding for each comment*/}
            <div className="flex justify-center p-10">
                <div className="w-1/2">
                    {comments.map((comment, index) => {
                        console.log(comment)
                        return (
                            <div key={index} className="rounded-lg shadow-md p-4 mb-4">
                                {/* Show comment author and content */}
                                <h4 className="font-bold mb-2">{comment.username}</h4>
                                <p className="text-gray-600">{comment.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CommentsList
