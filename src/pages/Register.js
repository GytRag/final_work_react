import React,{useState, useRef, useEffect} from 'react';
import {useNavigate} from "react-router-dom";



const Register = () => {

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);
    const passTwoRef = useRef(null);

    const [message, setMessage] = useState(null);

    const navigate = useNavigate();
    function trigNavigate() {
        navigate('/')
    }

    function register() {
                // keys to send
        // name, password

        const myUser = {
            name: usernameRef.current.value,
            passwordOne: passOneRef.current.value,
            passwordTwo: passTwoRef.current.value
        };

        // update object 'option'
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myUser)
        };
        fetch("http://167.99.138.67:1111/createaccount", option)
            .then(res => res.json())
            .then(response => {

                if(!response.success){
                    setMessage(response.message)
                }else {
                    setMessage(response.message)
                    setTimeout(trigNavigate,1000)
                }

            })

    }


    return (
        <div className='d-flex justify-content-center m-2'>
            <div className='d-flex flex-column gap-1 register'>
                <h3>Register</h3>
                <input type="text" placeholder='username' ref={usernameRef}/>
                <input type="password" placeholder='password 1' ref={passOneRef}/>
                <input type="password" placeholder='password 2' ref={passTwoRef}/>
                <button onClick={() => register()}>Register</button>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default Register;