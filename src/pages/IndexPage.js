import React, {useState, useRef, useEffect} from 'react';
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";
import UserComp from "../components/UserComp";



const IndexPage = () => {


    const {users} = useStore((state) => state);


    return (
        <div className='d-flex gap-1 flex-wrap m-2'>

            {users.map((x, i) => <UserComp item={x} key={i} />)}

        </div>
    );
};

export default IndexPage;