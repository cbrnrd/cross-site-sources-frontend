import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedArticlesThunk } from "../../thunks";
import ArticleCard from "../ArticleCard";

const LikedArticlePage = () => {
    const dispatch = useDispatch();
    const { likedArticles, loading } = useSelector((state) => state.articles);

    useEffect(() => {
        dispatch(getLikedArticlesThunk());
    }, []);

    console.log(likedArticles.articles)

    return (
        <>
            <h1 className="text-center font-bold mt-4 homepage-header">
                LIKED ARTICLES
            </h1>
            {
                loading && <div className="text-3xl font-bold text-center">Loading...</div>
            }
            {!loading && likedArticles && likedArticles.articles && (<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {likedArticles.articles.map((article) => (
                    <ArticleCard article={article} key={article._id} showLikeButton={false}/>
                ))}
            </div>)}
        </>
    );
};

export default LikedArticlePage;