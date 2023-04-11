import articles from '../ArticleCardGrid/articles.json'
import { useParams } from 'react-router-dom'
import CommentsList from '../CommentsList'


const ViewArticlePage = (props) => {
    let { id } = useParams()
    const article = articles.find(article => article._id == id)
    if (!article) {
        return <h1>Article not found</h1>
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

            {/* CommentsList component */}
            <CommentsList comments={article.comments} />
        </>
    )
}

export default ViewArticlePage