import React, {useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import http from "../plugin/https";
import PostComp from "../components/PostComp";
import useStore from "../store/main";

const SingleUserPage = () => {

    const {userConnected, setUserData, setUserPosts, userPosts, userData} = useStore((state) => state);

    const {username} = useParams();
    const inpRef = useRef(null);

    useEffect(() => {
        http.getToken("/user/" + username)
            .then(data => {
                setUserPosts(data.userPosts)
                setUserData(data.userData)
            })
    }, []);

    function sendMessage() {

        const item = {
            message: inpRef.current.value,
            messTo: userData
        }

        http.postToken("/sendmessage", item)
            .then(data => {
                if(data.success) inpRef.current.value = null;
            })
    }

    return (
        <div className='m-2 shadow rounded-2 p-2'>
            {userData && <div>
                <div className='d-flex flex-column flex-sm-row mb-5 p-2'>
                    <div><img className='userImg' src={userData.image} alt=""/></div>
                    <div className='ms-4 d-flex flex-column justify-content-between my-4'>
                        <div className='mb-3 fs-3'>User: <b>{userData.username}</b></div>
                        {userConnected.username !== userData.username && <div className='d-flex shadow inpBut rounded-2'>
                            <textarea placeholder='message' ref={inpRef} cols="30" rows="3"></textarea>
                            <button onClick={sendMessage}>send</button>
                        </div>}
                    </div>
                </div>


                <div>
                    <div className='ms-2'>Posts by: <b>{userData.username}</b></div>
                    <div className='d-flex gap-1 flex-wrap mt-2'>
                        {userPosts.map((x,i) => <PostComp post={x} key={i}/>)}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default SingleUserPage;