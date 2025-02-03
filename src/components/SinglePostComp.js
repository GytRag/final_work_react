import React from 'react';
import addPoke from "./addPoke";


const SinglePostComp = ({item}) => {

    return (
        <div className='border border-black rounded-2 userCard d-flex align-items-center justify-content-between'>
            <div className='px-2'>{item}</div>
            <div onClick={() => addPoke(item)}
                className='me-2 cursor-point fs-3 poke'>🫵</div>
        </div>
    );
};

export default SinglePostComp;