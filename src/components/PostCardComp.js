import React from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../store/main";
const PostCardComp = ({post}) => {

    const navigate = useNavigate();
    const {updateCurrentPost} = useStore((state) => state);

    function goTo() {
        updateCurrentPost(post.id)
        navigate(`/singlepost/${post.id}`)
    }

    return (

        <div onClick={goTo}
            className='postCard border border-black rounded-2 p-1 cursor-point'>
            <img src={post.image} alt=""/>
            <div>{post.description}</div>
        </div>
    );
};

export default PostCardComp;