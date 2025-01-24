import React, {useState, useRef, useEffect} from 'react';
import useStore from "../store/main";
import CommentComp from "../components/CommentComp";
import {useNavigate} from "react-router-dom";


const SinglePostPage = () => {

    const navigate = useNavigate();

    const {posts, currentPost, connected, loggedInUser, updatePosts} = useStore((state) => state);
    const [openPost, setOpenPost] = useState(null);
    const [change, setChange] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [allLikes, setAllLikes] = useState([]);

    const commentRef = useRef('');

    if(!openPost) {
        posts.map((post) => {
            if (currentPost === post.id) {
                setOpenPost(post)
                setAllComments(post.comments)
                setAllLikes(post.likes)
            }
        })

    }

    useEffect(() => {},[change])

    function addComment() {
        const newComment = {
            comm: commentRef.current.value,
            user: loggedInUser.username
        };
        const allNewComments = [...allComments, newComment];

        if(newComment.comm.length > 0){
            posts.map((post) => {
                if (currentPost === post.id) {
                    setAllComments(allNewComments);
                    post.comments = allNewComments;
                    openPost.comments = allNewComments;
                    commentRef.current.value = '';
                    setChange(!change)
                }
            })
        }

    }
    function deleteComment(item) {
        const newComments = allComments.filter((comment) => comment.comm !== item);

        posts.map((post) => {
            if (currentPost === post.id) {
                setAllComments(newComments)
                post.comments = newComments;
                openPost.comments = newComments;
                setChange(!change)
            }
        })
    }

    function addLike() {
        if(loggedInUser.username !== openPost.username){
            let userAddLike = false;
            let allNewLikes = ''
            allLikes.map((item) => {
                if(item.user === loggedInUser.username){
                    userAddLike = true;
                    allNewLikes = allLikes.filter((filt) => filt.user !== loggedInUser.username);
                }
            })

            if(!userAddLike){
                const newLike = {
                    like: true,
                    user: loggedInUser.username
                };

                allNewLikes = [...allLikes, newLike];

            }

            posts.map((post) => {
                if (currentPost === post.id) {
                    setAllLikes(allNewLikes);
                    post.likes = allNewLikes;
                    openPost.likes = allNewLikes;
                    setChange(!change)
                }
            })
        }

    }

    function detelePost() {
        const updatePost = posts.filter((post) => post.id !== openPost.id);
        updatePosts(updatePost)
        navigate(`/allposts`)
    }



    return (
        <div className='m-2 border border-black rounded-2 p-2 singleCard'>
            {openPost &&
                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <div className='d-flex gap-1'>
                        <img src={openPost.image} alt=""/>
                        <div className='ms-2'>
                            <div>{openPost.description}</div>
                            <div><b>{openPost.username}</b></div>
                        </div>
                    </div>

                    {openPost.username === loggedInUser.username && <button onClick={detelePost}>delete post</button>}
                </div>}

            {connected && openPost &&
                <div className='mb-2 d-flex gap-1 align-items-center'>
                    <input type="text" placeholder='new comment' ref={commentRef}/>
                    <button onClick={addComment}>comment</button>
                    <div onClick={addLike}
                        className='fs-4 px-2 cursor-point'>👍<small className='fs-14'>likes: {allLikes.length}</small></div>
                </div>}

            {openPost && openPost.comments.length > 0 &&
                <div className='d-flex gap-1 border border-black rounded-2 p-2 flex-column'>
                    <CommentComp item={openPost} loggedUser={loggedInUser} deleteComment={deleteComment}/>
                </div>}

        </div>
    );
};

export default SinglePostPage;