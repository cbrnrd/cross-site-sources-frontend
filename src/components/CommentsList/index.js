const CommentsList = ({ comments }) => {
    return (
        <>
            {/* rounded corners, drop shadow, and padding for each comment*/}
            <div className="p-10">
                {comments.map((comment, index) => (
                    <div key={index} className="rounded-lg shadow-md p-4 mb-4">
                        {/* Show comment author and content */}
                        <h4 className="font-bold mb-2">{comment.author}</h4>
                        <p className="text-gray-600">{comment.content}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CommentsList
