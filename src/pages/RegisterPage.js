import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugin/https";
import useStore from "../store/main";

const RegisterPage = () => {
    const {mainLink} = useStore((state) => state);

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);
    const passTwoRef = useRef(null);

    const [error, setError] = useState(null);
    const nav = useNavigate();

    function register() {
        const item = {
            username: usernameRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value
        }
        http.post(`/register`, item)
            .then(data => {
                if (!data.success) setError(data.message)
                if (data.success) {
                    setError(null)
                    nav(`${mainLink}/login`)
                }
            })
    }

    return (
        <div className='inpFocus d-flex justify-content-center m-2'>
            <div className='d-flex flex-column minMax shadow p-2 rounded-2'>
                <input type="text" placeholder='username' ref={usernameRef}/>
                <input type="password" placeholder='password one' ref={passOneRef}/>
                <input type="password" placeholder='password two' ref={passTwoRef}/>
                {error && <div className='m-2'>{error}</div>}
                <button onClick={register}>Register</button>

            </div>
        </div>
    );
};

export default RegisterPage;