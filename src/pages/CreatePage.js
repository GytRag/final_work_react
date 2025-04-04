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

        http.postToken("/createPost", item)
            .then(data => {
                if (!data.success) setError(data.message)
                if (data.success) {
                    setError(data.message)
                }
            })
    }



    return (
        <div className='container-fluid d-flex p-2 justify-content-center'>
            <div className='createPost rounded-2 p-2 inpFocus shadow'>
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