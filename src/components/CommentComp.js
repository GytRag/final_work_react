import React, {useState} from 'react';
import button from "bootstrap/js/src/button";

const CommentComp = ({item, loggedUser, deleteComment}) => {


    return (
        <div className='d-flex w-100 flex-column'>
            {item.comments.length > 0 && item.comments.map((x, i) =>
                <div key={i} className='mb-2 d-flex justify-content-between w-100 align-items-center'>
                    <div>
                        <div><b>{x.user}</b> commented:</div>
                        <div>{x.comm}</div>
                    </div>

                    {x.user === loggedUser.username && <button onClick={() => deleteComment(x.comm)}>Delete</button>}

                </div>)}
        </div>
    );
};

export default CommentComp;