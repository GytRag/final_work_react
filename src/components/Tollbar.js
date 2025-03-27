import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";


const Tollbar = () => {
    const navigate = useNavigate();
    const {userConnected,setPost, setMessages, setUserConnected, setFavorites, setUserData, setUserPosts, setSelected} = useStore((state) => state);
    const [select, setSelect] = useState("Home");

    function logout() {
        navigate('/login')
        setUserConnected(null);
        setFavorites(null)
        setUserData(null)
        setUserPosts(null)
        setSelected(null)
        setPost(null)
        setMessages(null)
        localStorage.setItem("token", null)

    }

    function navPage(page) {
        setSelect(page)
        setSelected(null)
        setMessages(null)
    }


    return (
        <div className='border border-black rounded-2 m-2 mb-0 p-2 d-flex tollBar justify-content-between align-items-start'>
            <div className='d-flex gap-3 flex-wrap'>

                {userConnected && <Link style={{textDecoration: select === 'Home'? "underline": "none"}}
                    onClick={()=>navPage('Home')}
                    className='link' to='/'>Home</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Profile'? "underline": "none"}}
                                        onClick={()=>navPage('Profile')}
                                        className='link' to='/profile'>Profile</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Create Post'? "underline": "none"}}
                                        onClick={()=>navPage('Create Post')}
                                        className='link' to='/create-post'>Create Post</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Messages'? "underline": "none"}}
                                        onClick={()=>navPage('Messages')}
                                         className='link' to='/messages'>Messages</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Favorites'? "underline": "none"}}
                                        onClick={()=>navPage('Favorites')}
                                         className='link' to='/favorites'>Favorites</Link>}


                {!userConnected && <Link className='link' to='/login'>Login</Link>}
                {!userConnected && <Link className='link' to='/register'>Register</Link>}

            </div>
            {userConnected && <div className='d-flex gap-3 align-items-center ms-2'>
                <div>{userConnected && userConnected.username}</div>
                <button onClick={logout}>Logout</button>
            </div>}


        </div>
    );
};

export default Tollbar;