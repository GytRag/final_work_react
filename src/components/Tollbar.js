import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import useStore from "../store/main";

const Tollbar = () => {

    const {users, updateUserConnected, updateUsers} = useStore((state) => state)
    const navigate = useNavigate();


    function logout() {
        updateUserConnected(null)
        updateUsers(null)
        navigate("/register")
    }

    return (
        <div className='border border-black rounded-2 m-2 mb-0 p-2 d-flex tollBar justify-content-between'>
            <div className='d-flex gap-3'>
                {users && <Link className='link' to='/'>Index page</Link>}
                {!users && <Link className='link' to='/register'>Register page</Link>}
                {!users && <Link className='link' to='/login'>Login page</Link>}
                {users && <Link className='link' to='/user'>User profile page</Link>}
            </div>

            {users && <button onClick={logout}>Logout</button>}

      </div>
    );
};

export default Tollbar;