import {useState} from 'react';
import http from "../plugin/https";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const PostComp = ({post}) => {

    const {setFavorites, favorites, setSelectPage, mainLink, userConnected} = useStore((state) => state);
    const nav = useNavigate();
    const [inFav, setInFav] = useState(null);
    if (inFav === null && userConnected) {
        const exist = favorites.find(fin => fin._id === post._id)
        if (exist) setInFav(true)
    }

    function addToFavorite() {
        const item = {
            post
        }
        http.postToken("/addfavorite", item)
            .then(data => {
                setFavorites(data.favoritePosts)
            })
    }

    function RemoveToFavorite() {
        const item = {
            post
        }
        http.postToken("/deleteFavorite", item)
            .then(data => {
                setFavorites(data.favoritePosts)
                setInFav(null)
            })
    }

    function gotTo(item) {
        if(userConnected) {
            setSelectPage(null)
            nav(mainLink + item)
        }
    }


    return (
        <div className='m-1 d-flex'>
            <div className='post shadow rounded-2 p-3 d-flex flex-column justify-content-between'>
                <img className='w-100' src={post.image} alt=""/>
                <div>
                    <h2 onClick={() => gotTo(`/post/${post._id}`)} className='fs-1 me-1 cursor-point'>{post.title}</h2>
                    <p onClick={() => gotTo(`/user/${post.name}`)} className='cursor-point my-1'>Created
                        by: <b>{post.name}</b></p>
                    {!inFav && userConnected && <button onClick={addToFavorite} className="mt-2 btn btn-outline-dark">Add to favorite</button>}
                    {inFav && userConnected && <button onClick={RemoveToFavorite} className="mt-2 btn btn-dark">Remove from favorites</button>}
                </div>
            </div>
        </div>
    );
};

export default PostComp;