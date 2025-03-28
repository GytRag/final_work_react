import React, {useRef, useState} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";
import {socket} from "../socket";
import http from "../plugin/https";

const LoginPage = () => {

    const {setUserConnected, setFavorites} = useStore((state) => state);
    const nav = useNavigate();

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);

    const [error, setError] = useState(null);

    function login() {
        const item = {
            username: usernameRef.current.value,
            password: passOneRef.current.value
        }
        http.post(`http://localhost:8001/login`, item)
            .then(data => {
                if(!data.success) setError(data.message)
                if(data.success) {
                    setUserConnected(data.myUser)
                    setFavorites(data.myUser.favorites)
                    localStorage.setItem('token', data.token)
                    socket.emit('login', data.myUser);
                    nav('/')
                }
            })
    }

    return (
        <div className='d-flex flex-column gap-1 align-items-center m-2'>
            <div>
                <input type="text" placeholder='username' ref={usernameRef} defaultValue={'gytis'}/>
            </div>
            <div>
                <input type="password" placeholder='password' ref={passOneRef} defaultValue={'gytis'}/>
            </div>
            {error && <div>{error}</div>}
            <div>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default LoginPage;