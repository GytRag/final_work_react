import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


const Login = ({set}) => {

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    function trigNavigate() {
        navigate('/')
    }

    function login() {
        // keys to send
        // name, password

        const myUser = {
            name: usernameRef.current.value,
            password: passOneRef.current.value
        };

        // update object 'option'
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myUser)
        };
        fetch("http://167.99.138.67:1111/login", option)
            .then(res => res.json())
            .then(response => {
                if(!response.success){
                    setMessage(response.message)
                }else {
                    setMessage(response.message)
                    set(response.secretKey, myUser.name)
                    setTimeout(trigNavigate,1000)
                }

            })

    }


    return (
        <div className='d-flex justify-content-center m-2'>
            <div className='d-flex flex-column gap-1 login'>
                <h3>Login</h3>
                <input type="text" placeholder='username' ref={usernameRef}/>
                <input type="password" placeholder='password' ref={passOneRef}/>
                <button onClick={() => login()}>Login</button>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Login;