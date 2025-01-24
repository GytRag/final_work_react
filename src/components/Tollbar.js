import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";


const Tollbar = () => {

    const {updateConnected, connected, updateLoggedInUser, haveCon, loggedInUser, posts} = useStore((state) => state);
    const navigate = useNavigate();


    function logout() {
        updateConnected(false)
        navigate("/register");
        updateLoggedInUser({})
    }



    return (
        <div className='border border-black rounded-2 m-2 mb-0 p-2 d-flex justify-content-between tollBar'>
            <div className='d-flex gap-3 '>
                {connected && <Link className='link' to='/'>Users list</Link>}
                {!connected && <Link className='link' to='/register'>Register page</Link>}
                {!connected && <Link className='link' to='/login'>Login page</Link>}
                {connected && <Link className='link' to='/profile'>Profile page</Link>}
                {connected && <Link className='link' to='/createpost'>Create post</Link>}
                {posts.length > 0 && <Link className='link' to='/allposts'>All posts</Link>}
                {haveCon && haveCon.includes(loggedInUser.username) && <Link className='link' to='/conversations'>Conversations</Link>}

            </div>

            <div>
                <button onClick={logout}>Logout</button>
            </div>

      </div>
    );
};

export default Tollbar;