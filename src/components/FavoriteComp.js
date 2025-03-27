import http from "../plugin/https";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const FavoriteComp = ({post}) => {
    const {setFavorites} = useStore((state) => state);
    const nav = useNavigate();

    function RemoveToFavorite() {
        const item = {
            post
        }

        http.postToken("http://localhost:8001/deleteFavorite", item)
            .then(data => {
                setFavorites(data.favoritePosts)
            })
    }

    return (
        <div className='post border rounded-2 p-3 d-flex flex-column justify-content-between'>
            <img className='image' src={post.image} alt=""/>
            <div>
                <h2 onClick={() => nav(`/post/${post._id}`)} className='fs-1 me-1 cursor-point'>{post.title}</h2>
                <p onClick={() => nav(`/user/${post.name}`)} className='cursor-point  my-1'>Created by: <b>{post.name}</b></p>
                <button onClick={RemoveToFavorite} className="mt-2">Remove from favorites</button>
            </div>
        </div>
    );
};

export default FavoriteComp;