import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (

    <div className="bg-white rounded-lg shadow-md p-4">
      <Link to={`/article/${article._id}`} className="block mb-4">
        <h2 className="font-bold text-lg mb-2">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{article.content}</p>
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-xs">{article.likes} likes</p>
        {/* <p className="text-gray-400 text-xs">3 comments</p> */}

        <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"><i
          className="far fa-thumbs-up"></i> Like</button>
      </div>
    </div>
  );
}

export default ArticleCard;
