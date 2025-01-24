import React, {useState, useRef} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const {users, updateUsers, connected} = useStore((state) => state);

    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);
    const passTwoRef = useRef(null);

    const [error, setError] = useState(null);

    function addUser() {

        const username = usernameRef.current.value;
        const passOne = passOneRef.current.value;
        const passTwo = passTwoRef.current.value;

        let userExist = false;

        const newUser = {
            username: username,
            passOne: passOne,
            passTwo: passTwo,
            image: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg",
            id: users.length + 1
            };


        users.map((user) => {
            if(user.username === newUser.username){
                userExist = true;
                setError("username exist")
            }
        })


        if (!userExist) {
            if(username.length === 0){setError("add username") }
            else{
                if(passOne.length < 5) { setError("password to short")}
                else if(passOne.length > 15) {setError("password to long")}
                else {
                    if(passOne !== passTwo){setError("passwords do not match")}
                    else {
                        updateUsers([...users, newUser]);
                        navigate('/login')
                    }
                }
            }

        }
    }

    return (
        <div className='d-flex flex-column align-items-center gap-1 mt-2'>
            <input type="text" placeholder='username' ref={usernameRef}/>
            <input type="password" placeholder='password one' ref={passOneRef}/>
            <input type="password" placeholder='password two' ref={passTwoRef}/>
            <div style={{color: "red"}}>{error}</div>
            <button onClick={addUser}>Register</button>
        </div>
    );
};

export default RegisterPage;