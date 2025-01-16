import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import CurrentPostComp from "../components/CurrentPostComp";


const CurrentPost = ({setKey, logInName}) => {


    const {username, id} = useParams();
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        fetch(`http://167.99.138.67:1111/getsinglepost/${username}/${id}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data.data);
            })
    },[])




    return (
        <div className='m-2 d-flex flex-wrap gap-1'>

            {userData !== null && <CurrentPostComp item={userData} setKey={setKey} logInName={logInName}/>}

        </div>

    );
};

export default CurrentPost;