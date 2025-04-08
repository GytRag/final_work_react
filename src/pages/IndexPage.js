import {useEffect} from 'react';
import http from "../plugin/https";
import PostComp from "../components/PostComp";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const IndexPage = () => {
    const {userConnected, posts, setPosts, mainLink} = useStore((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        http.get("/allPosts")
            .then(data => {
                if (data.success) setPosts(data.posts)
            })
    }, [])

    return (
        <div className='container-fluid'>
            {!userConnected && <div className='shadow rounded-2 p-2'>
                <p>Please log in to have all the features: read, create, comment on posts, send messages to post authors
                    (if the author is logged in, messages are received immediately using socket.io)</p>
            </div>}
            <div className='indexPage mt-1'>
                {posts && posts.map((post) => <PostComp key={post._id} post={post}/>)}
            </div>
        </div>

    );
};

export default IndexPage;