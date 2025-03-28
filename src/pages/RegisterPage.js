import {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../plugin/https";

const RegisterPage = () => {

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
        http.post(`http://localhost:8001/register`, item)
            .then(data => {
                if(!data.success) setError(data.message)
                if(data.success) {
                    setError(null)
                    nav('/login')
                }
            })
    }

    return (
        <div className='d-flex flex-column gap-1 align-items-center m-2'>
            <div>
                <input type="text" placeholder='username' ref={usernameRef}/>
            </div>
            <div>
                <input type="password" placeholder='password one' ref={passOneRef}/>
            </div>
            <div>
                <input type="password" placeholder='password two' ref={passTwoRef}/>
            </div>
            {error && <div>{error}</div>}
            <div>
                <button onClick={register}>Register</button>
            </div>
        </div>
    );
};

export default RegisterPage;