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
        socket.emit("logout")
    }

    function navPage(page) {
        setSelectPage(page)
        setSelected(null)
        setConvers(null)
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
            className='tollBarr rounded-2 m-2 mb-0 p-2 d-flex tollBar justify-content-between align-items-start'>
            <div className='d-flex gap-1 flex-wrap bgDark'>

                {userConnected && <Link onClick={() => navPage('Home')}
                                        className={`btn ${select === 'Home' ? 'btn-dark' : 'btn-outline-dark'}`} to='/'>Home</Link>}

                {userConnected && <Link onClick={() => navPage('Profile')}
                                        className={`btn ${select === 'Profile' ? 'btn-dark' : 'btn-outline-dark'}`} to='/profile'>Profile</Link>}

                {userConnected && <Link onClick={() => navPage('Create Post')}
                                        className={`btn ${select === 'Create Post' ? 'btn-dark' : 'btn-outline-dark'}`} to='/create-post'>Create Post</Link>}

                {userConnected && <Link onClick={() => navPage('Messages')}
                                        className={`btn ${select === 'Messages' ? 'btn-dark' : 'btn-outline-dark'}`} to='/messages'>
                                    <div className={`position-relative`}>
                                        <div>Messages</div>
                                        {newMessages.length > 0 && <div className='newMess'>📨</div>}
                                    </div>

                                </Link>}

                {userConnected && <Link onClick={() => navPage('Favorites')}
                                        className={`btn ${select === 'Favorites' ? 'btn-dark' : 'btn-outline-dark'}`} to='/favorites'>Favorites</Link>}

                {!userConnected && <Link className={`btn btn-outline-dark`} to='/login'>Login</Link>}
                {!userConnected && <Link className={`btn btn-outline-dark`} to='/register'>Register</Link>}

            </div>
            {userConnected && <div className='d-flex gap-3 align-items-center ms-2 bgDark'>
                <h5 className='mb-0' >{userConnected && userConnected.username}</h5>
                <button className='btn btn-outline-dark' onClick={logout}>Logout</button>
            </div>}


        </div>
    );
};

export default Tollbar;