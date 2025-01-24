import React, {useState, useRef, useEffect} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {

    const {loggedInUser, users, updateUsers, posts, updatePosts, updateLoggedInUser, updateConnected} = useStore((state) => state);

    const navigate = useNavigate();

    const [change, setChange] = useState(false);
    const imgRef = useRef(null);

    const passRef = useRef(null);
    const [error, setError] = useState(null);


    useEffect(() => {},[change])

    function changeImg() {

        const newImg = imgRef.current.value;

        if(newImg.length > 0){
            users.map(user => {
                if(user.username === loggedInUser.username){
                    user.image = newImg;
                    loggedInUser.image = newImg;
                    setChange(!change);
                }
            })
        }

    }

    function deleteUser() {
        const password = passRef.current.value;

        if(password !== loggedInUser.passOne){
            setError("password don't match");
        }

        if(password === loggedInUser.passOne){
            setError(null)

            let upPost = posts.filter(post => post.username !== loggedInUser.username)
            let upSecPost = [];

            upPost.map((post) => {
                post.comments = post.comments.filter(comment => comment.user !== loggedInUser.username);
                post.likes = post.likes.filter(like => like.user !== loggedInUser.username);
                upSecPost.push(post);
            })
            updatePosts(upSecPost);
            updateUsers(users.filter(user => user.username !== loggedInUser.username));

            updateLoggedInUser({})
            updateConnected(false)
            navigate('/register')

        }
    }


    return (
        <div className='d-flex flex-column m-2'>
            <div className='d-flex gap-1'>
                <div className='imgOne'><img src={loggedInUser.image} alt=""/></div>
                <div className='mt-3'>{loggedInUser.username}</div>
            </div>
            <div className='ms-2 mt-2 d-flex gap-1'>
                <input type="text" placeholder='new image URL' ref={imgRef}/>
                <button onClick={changeImg}>change image</button>
            </div>
            <div className='ms-2 mt-2 d-flex gap-1'>
                <input type="password" placeholder='password' ref={passRef}/>
                <button onClick={deleteUser}>Delete user</button>
            </div>
            {error && <div className='ms-2 mt-1'>{error}</div>}

        </div>
    );
};

export default ProfilePage;