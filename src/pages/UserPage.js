import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import SinglePost from "../components/SinglePost";


const UserPage = () => {

    // possible to write > const {username} = useParams() , and then when using "params",
    // need to write only "username" (not "params.username")
    const params = useParams();
    const [userData, setUserData] = useState(null);



    useEffect(() => {
        fetch(`http://167.99.138.67:1111/getUserPosts/${params.username}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data.data);
            })
    },[])



    return (
        <div className='m-2 d-flex flex-wrap gap-1'>
            {userData !== null && userData !== undefined && userData.map((x, i) => <SinglePost item={x} key={i}/>)}

        </div>
    );
};

export default UserPage;