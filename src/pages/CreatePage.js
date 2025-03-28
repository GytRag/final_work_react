import {useState, useRef} from 'react';
import http from "../plugin/https";
const CreatePage = () => {

    const [error, setError] = useState(null);

    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const description = useRef(null);

    function create() {
        const item = {
            image: imageRef.current.value,
            title: titleRef.current.value,
            description: description.current.value,
        }

        if(!item.image || !item.title || !item.description) return setError("All fields must be filled in")

        http.postToken("http://localhost:8001/createPost", item)
            .then(data => {
                if (!data.success) setError(data.message)
                if (data.success) {
                    setError(data.message)
                }
            })
    }



    return (
        <div className='m-2 border border-black rounded-2 d-flex gap-2 p-2'>
            <div className='border rounded-2 p-1 grow2'>

                <div className='d-flex flex-column'>
                    <input type="text" placeholder='image url' ref={imageRef}/>
                    <input type="text" placeholder='title' ref={titleRef}/>
                    <textarea placeholder='description' ref={description}></textarea>
                    {error && <div>{error}</div>}
                    <button onClick={create}>Create post</button>
                </div>

            </div>

        </div>
    );
};


export default CreatePage;