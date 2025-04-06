import {useEffect} from 'react';
import http from "../plugin/https";
import PostComp from "../components/PostComp";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";

const IndexPage = () => {
    const { userConnected, posts, setPosts, mainLink} = useStore((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        if(userConnected) {
            http.getToken("/allPosts")
                .then(data => {
                    if (data.success) setPosts(data.posts)
                })
        }

    },[])

    useEffect(() => {
        if(!userConnected) navigate(`${mainLink}/login`)
    }, []);

    return (
        <div className='indexPage container-fluid mt-1'>
            {posts && posts.map((post) => <PostComp key={post._id} post={post}/>)}
        </div>
    );
};

export default IndexPage;