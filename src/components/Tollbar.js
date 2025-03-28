import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";
import {socket} from "../socket";

const Tollbar = () => {
    const navigate = useNavigate();
    const {
        userConnected,
        setPosts,
        setPost,
        setNewMessages,
        newMessages,
        setUserConnected,
        setFavorites,
        setUserData,
        setUserPosts,
        setSelected,
        selected,
        select,
        setSelectPage,
        setConvers
    } = useStore((state) => state);

    const [change, setChange] = useState(false);

    function logout() {
        navigate('/login')
        setUserConnected(null);
        setFavorites(null)
        setUserData(null)
        setUserPosts(null)
        setSelected(null)
        setPosts(null)
        setPost(null)
        setConvers(null)
        setSelectPage("Home")
        localStorage.setItem("token", null)

    }

    function navPage(page) {
        setSelectPage(page)
        setSelected(null)
    }

    useEffect(() => {
        const handleGotMessage = (data) => {
            const mes = newMessages
            const exist = mes.find(fin => fin === data._id)
            if (!exist) {
                if (selected) {
                    if (selected._id !== data._id) {
                        mes.push(data._id)
                        setNewMessages(mes)
                    }
                }else {
                    mes.push(data._id)
                    setNewMessages(mes)
                }
            }
            setChange(!change)
        };

        const handleGetChat = (data) => {
            const mes = newMessages
            mes.push(data[data.length - 1]._id)
            setNewMessages(mes)
            setChange(!change)
        };

        socket.on("newMessage", handleGotMessage);
        socket.on("newChat", handleGetChat);

        return () => {
            socket.off("newMessage", handleGotMessage);
            socket.off("newChat", handleGetChat);

        };
    }, [change, selected])


    return (
        <div
            className='border border-black rounded-2 m-2 mb-0 p-2 d-flex tollBar justify-content-between align-items-start'>
            <div className='d-flex gap-3 flex-wrap'>

                {userConnected && <Link style={{textDecoration: select === 'Home' ? "underline" : "none"}}
                                        onClick={() => navPage('Home')}
                                        className='link' to='/'>Home</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Profile' ? "underline" : "none"}}
                                        onClick={() => navPage('Profile')}
                                        className='link' to='/profile'>Profile</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Create Post' ? "underline" : "none"}}
                                        onClick={() => navPage('Create Post')}
                                        className='link' to='/create-post'>Create Post</Link>}

                {userConnected && <Link onClick={() => navPage('Messages')}
                                        className='link' to='/messages'>
                                    <div className='position-relative'>
                                        <div style={{textDecoration: select === 'Messages' ? "underline" : "none"}}
                                        >Messages
                                        </div>
                                        {newMessages.length > 0 && <div className='newMess'>📨</div>}
                                    </div>

                                </Link>}

                {userConnected && <Link style={{textDecoration: select === 'Favorites' ? "underline" : "none"}}
                                        onClick={() => navPage('Favorites')}
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