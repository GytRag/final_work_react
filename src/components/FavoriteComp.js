import http from "../plugin/https";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const FavoriteComp = ({post}) => {
    const {setFavorites, setSelectPage} = useStore((state) => state);
    const nav = useNavigate();

    function RemoveToFavorite() {
        const item = {
            post
        }
        http.postToken("/deleteFavorite", item)
            .then(data => {
                setFavorites(data.favoritePosts)
            })
    }

    function gotTo(item) {
        setSelectPage(null)
        nav(item)
    }

    return (
        <div className='m-1 d-flex'>
            <div className='post shadow rounded-2 p-3 d-flex flex-column justify-content-between'>
                <img className='w-100' src={post.image} alt=""/>
                <div>
                    <h2 onClick={() => gotTo(`/post/${post._id}`)} className='fs-1 me-1 cursor-point'>{post.title}</h2>
                    <p onClick={() => gotTo(`/user/${post.name}`)} className='cursor-point  my-1'>Created
                        by: <b>{post.name}</b></p>
                    <button onClick={RemoveToFavorite} className="mt-2 btn btn-dark">Remove from favorites</button>
                </div>
            </div>
        </div>
    );
};

export default FavoriteComp;