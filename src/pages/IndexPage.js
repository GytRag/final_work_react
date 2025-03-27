import {useEffect, useState} from 'react';
import http from "../plugin/https";
import PostComp from "../components/PostComp";
import useStore from "../store/main";
import {socket} from "../socket";
import {useNavigate} from "react-router-dom";

const IndexPage = () => {
    const { favorites, userConnected} = useStore((state) => state);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if(userConnected) {
            http.getToken("http://localhost:8001/allPosts")
                .then(data => {
                    if (data.success) setPosts(data.posts)
                })
        }

    },[])

    useEffect(() => {
        if(!userConnected) navigate('/login')
    }, []);

    return (
        <div className='m-2 d-flex flex-wrap gap-1'>
            {posts && posts.map((post) => <PostComp key={post._id} post={post}/>)}
        </div>
    );
};

export default IndexPage;