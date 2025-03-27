import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";
import {socket} from "../socket";


const Tollbar = () => {
    const navigate = useNavigate();
    const {
        userConnected,
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
        setSelectPage
    } = useStore((state) => state);
    // const [select, setSelect] = useState("Home");
    const [change, setChange] = useState(false);


    function logout() {
        navigate('/login')
        setUserConnected(null);
        setFavorites(null)
        setUserData(null)
        setUserPosts(null)
        setSelected(null)
        setPost(null)
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

        socket.on("gotMessage", handleGotMessage);
        socket.on("getChat", handleGetChat);

        return () => {
            socket.off("gotMessage", handleGotMessage);
            socket.off("getChat", handleGetChat);

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

                {userConnected && <Link style={{textDecoration: select === 'Messages' ? "underline" : "none"}}
                                        onClick={() => navPage('Messages')}
                                        className='link' to='/messages'>Messages</Link>}

                {userConnected && <Link style={{textDecoration: select === 'Favorites' ? "underline" : "none"}}
                                        onClick={() => navPage('Favorites')}
                                        className='link' to='/favorites'>Favorites</Link>}


                {!userConnected && <Link className='link' to='/login'>Login</Link>}
                {!userConnected && <Link className='link' to='/register'>Register</Link>}

            </div>
            {userConnected && <div className='d-flex gap-3 align-items-center ms-2'>
                <div onClick={() => console.log(newMessages)}>{userConnected && userConnected.username}</div>
                <button onClick={logout}>Logout</button>
            </div>}


        </div>
    );
};

export default Tollbar;