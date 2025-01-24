import React, {useState, useRef} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {

    const {users, updateConnected, updateLoggedInUser} = useStore((state) => state);

    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);


    const [error, setError] = useState(null);


    function connect() {

        const username = usernameRef.current.value;
        const passOne = passOneRef.current.value;

        let userExist = false;

        users.map((user) => {
            if(user.username === username){
                userExist = true;
                if(user.passOne !== passOne){setError('wrong password')}
                else {
                    updateConnected(true)
                    updateLoggedInUser(user)
                    navigate('/profile')
                }
            }
        })
        if(!userExist) setError('wrong username')
    }


    return (
        <div className='d-flex flex-column align-items-center gap-1 mt-2'>
            <input type="text" placeholder='username' ref={usernameRef}/>
            <input type="password" placeholder='password' ref={passOneRef}/>
            <div style={{color: "red"}}>{error}</div>
            <button onClick={connect}>Login</button>
        </div>
    );
};

export default LoginPage;