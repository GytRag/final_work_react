import React, {useEffect, useState} from 'react';
import SinglePost from "../components/SinglePost";

const IndexPage = ({}) => {

    const [data, setData] = useState(null);


    useEffect(() => {
        fetch('http://167.99.138.67:1111/getallposts')
            .then(res => res.json())
            .then(data => {
                const posts = []

                for (let i = data.data.length-1; i > 420 ; i--) {
                    posts.push(data.data[i])
                }
                setData(posts);
            })
    },[])



    return (
        <div className='m-2 d-flex flex-wrap gap-1'>
            {data !== null && data !== undefined && data.map((x) => <SinglePost item={x} key={x.id} />)}

        </div>
    );
};

export default IndexPage;