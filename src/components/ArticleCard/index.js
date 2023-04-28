import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeArticleThunk, unlikeArticleThunk, deleteArticleThunk } from "../../thunks";
import { useState } from "react";
import { useSelector } from "react-redux";

const ArticleCard = ({ article }) => {
  const [likes, setLikes] = useState(article.likes);
  const { isLoggedIn, role, likedArticles } = useSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState(likedArticles.includes(article._id));


  // if (isLiked) {
  //   console.log("Article is liked")
  // }

  const isAdmin = role === "admin";

  const dispatch = useDispatch();

  const likeArticle = async (e) => {
    e.preventDefault();
    if (isLiked) return;
    const articleId = article._id;
    await dispatch(likeArticleThunk(articleId));
    setLikes(likes + 1);
    setIsLiked(true);
  }

  const unlikeArticle = async (e) => {
    e.preventDefault();
    if (!isLiked) return;
    const articleId = article._id;
    await dispatch(unlikeArticleThunk(articleId));
    setLikes(likes - 1);
    setIsLiked(false);
  }

  const deleteArticle = async (e) => {
    e.preventDefault();
    const articleId = article._id;
    await dispatch(deleteArticleThunk(articleId));
    // Refresh
    window.location.reload();
  }

  return (

    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition ease-in duration-200 hover:scale-105 transform outline outline-offset-2 outline-red-500">
      <Link to={`/article/${article._id}`} className="block mb-4">
        <h2 className="font-bold text-lg mb-2">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-4">{article.content}</p>
      </Link>
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-xs">{likes} likes</p>
        { /* Add delete button if user is admin, otherwise do nothing*/}
        { isAdmin && <button onClick={deleteArticle} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"><i className="fas fa-trash-alt"></i> Delete</button> }
        { (!isLiked && isLoggedIn) ?
          (<button onClick={likeArticle} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"><i
          className="far fa-thumbs-up" ></i> Like</button>) :
          (<button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"><i
          className="far fa-thumbs-up" disabled></i> Like</button>)
        }

        {
          isLiked && (
            <button onClick={unlikeArticle} className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"><i className="far fa-thumbs-down"></i> Unlike</button>
          )
        }
      </div>
    </div>
  );
}

export default ArticleCard;
