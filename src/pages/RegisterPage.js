import React, {useRef, useState} from 'react';
import http from "../plugins/https";

const RegisterPage = () => {

    const [error, setError] = useState(null);


    const regUserRef = useRef(null);
    const regPassOneRef = useRef(null);
    const regPassTwoRef = useRef(null);

    const register = async (e) => {
        e.preventDefault();
        setError(null);

        const item = {
            username: regUserRef.current.value,
            passOne: regPassOneRef.current.value,
            passTwo: regPassTwoRef.current.value
        }

        if (!item.username || !item.passOne || !item.passTwo) {
            setError('All fields are required')
            return
        }

        const res = await http.post('http://localhost:8001/register', item)


        if(!res.success) {
            setError(res.message)
        }

    }



    return (
        <div className='d-flex justify-content-center m-2 gap-2'>

            <div className='border p-2 d-flex flex-column gap-1'>
                <div>Register</div>
                <input type="text" placeholder='username' ref={regUserRef}/>
                <input type="password" placeholder='password' ref={regPassOneRef}/>
                <input type="password" placeholder='password repeat' ref={regPassTwoRef}/>
                {error && <div>{error}</div>}
                <button onClick={register}>register</button>
            </div>
        </div>
    );
};

export default RegisterPage;