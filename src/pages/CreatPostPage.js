import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";


const CreatPostPage = () => {

    const {users, connected, posts, updatePosts, loggedInUser} = useStore((state) => state);
    const navigate = useNavigate();

    const imageRef = useRef(null);
    const descriptionRef = useRef(null);

    function addPost() {
        const addImg = imageRef.current.value;
        const addDesc = descriptionRef.current.value;

        const newPost = {
            username: loggedInUser.username,
            description: addDesc,
            image: addImg,
            comments: [],
            likes: [],
            id: posts.length + 1
        };

        if(addImg.length > 0 && addDesc.length > 0){
            updatePosts([...posts, newPost]);
            navigate('/allposts')
        }

    }

    return (
        <div className='d-flex flex-column align-items-center gap-1 mt-2'>
            <input type="text" placeholder='image url' ref={imageRef}/>
            <input type="text" placeholder='description' ref={descriptionRef}/>
            <button onClick={addPost}>Create post</button>
        </div>
    );
};

export default CreatPostPage;