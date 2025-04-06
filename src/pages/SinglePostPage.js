import React, {useEffect, useState, useRef} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import http from "../plugin/https";
import useStore from "../store/main";

const SinglePostPage = () => {
    const {userConnected, setFavorites, favorites, setPost, post, mainLink} = useStore((state) => state);

    const {post_id} = useParams();
    const [change, setChange] = useState(null);
    const inpRef = useRef(null);
    const nav = useNavigate();

    useEffect(() => {

        http.getToken("/post/" + post_id)
            .then(data => {
                setPost(data.currentPost)
            })
    }, [change]);


    function addComment() {
        const item = {
            comment: inpRef.current.value,
            post_id
        }

        http.postToken("/addcomment", item)
            .then(data => {
                inpRef.current.value = null;
                setChange(!change)
            })
    }

    function deletePost() {
        const item = {
            post
        }

        http.postToken("/deletepost", item)
            .then(data => {
                if(data.success) {
                    setFavorites(favorites.filter(filt => filt._id !== post_id))
                    nav('/')
                }
            })

    }

    return (
        <div className='m-2 shadow rounded-2 p-2'>
            {post &&
                <div>
                    <div className='d-flex flex-column flex-sm-row' >
                        <div className='w-50'>
                            <img className='w-100' src={post.image} alt=""/>
                            <div>
                                <div className='my-3'>
                                    {post.comments.map((x, i) =>
                                        <div key={i}>
                                            <span className='fst-italic'>{x.username}:</span> {x.comment}
                                        </div>
                                    )}
                                </div>
                                <div className='inpBut shadow d-flex rounded-2'>
                                    <input className='w-100' type="text" placeholder='add comment' ref={inpRef}/>
                                    <button onClick={addComment}>Comment</button>
                                </div>
                            </div>
                        </div>

                        <div className='ms-3'>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div>Created: {new Intl.DateTimeFormat('lt-LT', {
                                year: 'numeric',
                                month: '2-digit',    // "long" for full month name (e.g., "liepa")
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                timeZone: 'Europe/Vilnius',  // Explicitly specify the time zone for Lithuania
                                hour12: false                // Use 24-hour format
                            }).format(post.timestamp)}</div>
                            <p onClick={() => nav(`${mainLink}/user/${post.name}`)}  className='cursor-point my-1 singlePostUsername'>Created by: <b>{post.name}</b></p>
                            {post.user_id === userConnected._id && <button className='btn btn-outline-dark' onClick={deletePost}>Delete post</button>}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SinglePostPage;