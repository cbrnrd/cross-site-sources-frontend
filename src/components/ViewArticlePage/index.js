import { useParams } from 'react-router-dom'
import CommentsList from '../CommentsList'
import CommentBox from '../CommentBox'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { getArticle } from '../../thunks'
import { useState } from 'react'


const ViewArticlePage = (props) => {
    const dispatch = useDispatch()
    let { articles, article, article2, loading } = useSelector(state => state.articles)  // Get articles from redux store
    let { id } = useParams()  // Get id from url

    article = articles.find(article => article._id === id)  // Find article with id

    useEffect(() => {
        dispatch(getArticle(id))  // Dispatch getArticle thunk
    }, [])


    if (loading) {
        // Centered H1
        return <h1 className="text-3xl font-bold mb-2 text-center">Loading...</h1>
    }

    if (!article) {
        // Centered H1
        return <h1 className="text-3xl font-bold mb-2 text-center">Article not found</h1>
    }

    return (
        <>
            {/* Centered text with title and content*/}
            <div className="flex justify-center p-10">
                <div className="w-1/2">
                    {/* Show image from imageUrl */}
                    <img src={article.imageUrl} alt={article.title} className="mb-4" />
                    <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
                    <h4 className="text-xl font-bold mb-2">{article.author}</h4>
                    <p className="text-gray-600 mb-4">{article.content}</p>
                    <a href={article.url} className="text-red-500 mb-3 text-s">Read more</a>
                    <p className="text-gray-400 text-s">{article.likes} likes</p>
                </div>
            </div>

            <CommentBox articleId={article._id} />
            {/* CommentsList component */}
            <CommentsList comments={article.comments} />
        </>
    )
}

export default ViewArticlePage
