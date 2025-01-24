import React, {useRef} from 'react';
import useStore from "../store/main";
import PostCardComp from "../components/PostCardComp";


const AllPostsPage = () => {


    const {posts} = useStore((state) => state);


    return (
        <div className='m-2 border border-black rounded-2 d-flex flex-wrap gap-1 p-2'>
            {posts.map((post) => <PostCardComp post={post} key={post.id} />)}
        </div>
    );
};

export default AllPostsPage;