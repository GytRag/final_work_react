import React from 'react';
import {Link} from "react-router-dom";



const Tollbar = () => {


    return (
        <div className='border border-black rounded-2 m-2 mb-0 p-2 d-flex tollBar justify-content-between align-items-start'>
            <div className='d-flex gap-3 flex-wrap'>
                <Link className='link' to='/'>All users</Link>
                <Link className='link' to='/login'>Login</Link>
                <Link className='link' to='/register'>Register</Link>

            </div>

        </div>
    );
};

export default Tollbar;