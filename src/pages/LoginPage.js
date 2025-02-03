import React, {useRef} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";
const LoginPage = () => {

    const navigate = useNavigate();
    const {error, updateError, updateUsers, updateUserConnected} = useStore((state) => state)

    const refs = {
        username: useRef(),
        password: useRef()
    }


    function login() {

        const item = {
            username: refs.username.current.value,
            password: refs.password.current.value
        }


        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }


        updateError(null)

        fetch("http://localhost:8001/login", options)
            .then(res => res.json())
            .then(data => {
                if (data.error) updateError(data.message)
                if (!data.error) {
                    updateError('')

                        fetch('http://localhost:8001')
                            .then(res => res.json())
                            .then(data => {
                                updateUsers(data.users);
                                updateUserConnected(data.pokes)
                                console.log(data)
                            })

                    navigate('/')
                }
            })


    }

    return (
        <div className="text-center">
            <div>
                {error && error}
            </div>
            <div className='m-2 d-flex gap-1 flex-column align-items-center m-2'>
                <input type="text" placeholder='username' ref={refs.username}/>
                <input type="password" placeholder='password' ref={refs.password}/>
                <button onClick={login}>login</button>
            </div>

        </div>
    );
};

export default LoginPage;