import React, {useRef, useState} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const CreateComp = () => {
    const navigate = useNavigate();
    const {updateError } = useStore((state) => state)

    const usernameRef = useRef(null);
    const passOneRef = useRef(null);
    const passTwoRef = useRef(null);


    function addUser() {

        let error = null;

        const newUser = {
            username: usernameRef.current.value,
            passOne: passOneRef.current.value,
            passTwo: passTwoRef.current.value
        }

        if(newUser.passOne !== newUser.passTwo) error = 'passwords do not match'


        updateError(error)

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        }


        if(!error){

            updateError(null)

            fetch("http://localhost:8001/addUser", options)
                .then(res => res.json())
                .then(data => {
                    if(data.error) updateError(data.message)
                    if(!data.error) {
                        updateError('')
                        navigate('/login')
                    }
                })
        }



    }


    return (

            <div className='d-flex gap-1 flex-column align-items-center m-2'>

                <input type="text" placeholder='username' ref={usernameRef} />

                <input type="password" placeholder='password 1' ref={passOneRef} />

                <input type="password" placeholder='password 1' ref={passTwoRef} />

                <button onClick={addUser}>Add user</button>
            </div>

    );
};

export default CreateComp;