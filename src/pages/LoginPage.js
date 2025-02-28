import {useState, useRef} from 'react';
import http from '../plugins/https'
import useStore from "../store/main";


const LoginPage = ({socket}) => {

    const [error, setError] = useState(null);
    const {setUser} = useStore((state) => state);


    const loginUserRef = useRef(null);
    const loginPassRef = useRef(null);


    const login = async (e) => {
        e.preventDefault();
        setError(null);

        const username = loginUserRef.current.value
        const password = loginPassRef.current.value


        if (!username || !password) {
            setError('All fields are required')
            return
        }

        const res = await http.post('http://localhost:8001/login', {username, password})

        if(res.success) {
            socket.emit('login', res.myUser);
            localStorage.setItem('token', res.token);
            setUser(res.myUser)
        }
    }


    return (
        <div className='d-flex justify-content-center m-2 gap-2'>

            <div className='border p-2 d-flex flex-column gap-1'>
                <div>Login</div>
                <input type="text" placeholder='username' ref={loginUserRef} />
                <input type="password" placeholder='password' ref={loginPassRef}/>
                {error && <div>{error}</div>}
                <button onClick={login}>login</button>
            </div>


        </div>
    );
};

export default LoginPage;