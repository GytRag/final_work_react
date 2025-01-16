import React from 'react';
import {Link} from "react-router-dom";

const SinglePost = ({item}) => {


    return (
        <div className='grow1 d-flex flex-column border border-dark rounded-2 p-2 singlePost justify-content-between'>
            <div>
                <img className='w-100' src={item.image} alt=""/>

                <Link className='titleLink' to={`/singlePost/${item.username}/${item.id}`}> {item.title} </Link>

            </div>
            <div>
                <div>
                    <Link className='userLink' to={`/user/${item.username}`}> {item.username} </Link>
                </div>
                <small>{new Date(item.timestamp).toLocaleString('lt-LT', { timeZone: 'Europe/Vilnius' })}</small>
            </div>


        </div>
    );
};

export default SinglePost;