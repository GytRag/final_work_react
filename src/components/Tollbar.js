import React from 'react';
import {Link} from "react-router-dom";


const Tollbar = ({setKey, username}) => {


    return (
        <div className='border border-black rounded-2 m-2 mb-0 p-2 d-flex gap-3 tollBar'>
            <Link className='link' to='/'>Index page</Link>
            {!setKey && <Link className='link' to='/login'>Login</Link>}
            {!setKey && <Link className='link' to='/register'>Register</Link>}
            {setKey && <Link className='link' to='/upload'>Upload post</Link>}
            {setKey && <Link className='link' to={`/user/${username}`}>My posts</Link>}
      </div>
    );
};

export default Tollbar;