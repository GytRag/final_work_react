import React, {useState, useRef} from 'react';

const UploadPage = ({setKey}) => {

    const [message, setMessage] = useState(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const descriptionRef = useRef(null);

    function upload() {
        // keys to send
        // name, password

        const myUser = {
            secretKey: setKey,
            title: titleRef.current.value,
            image: imageRef.current.value,
            description: descriptionRef.current.value,
        };

        // update object 'option'
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myUser)
        };
        fetch("http://167.99.138.67:1111/createpost", option)
            .then(res => res.json())
            .then(response => {
                setMessage(response.message)

            })

    }

    return (
        <div className='d-flex justify-content-center m-2'>
            <div className='d-flex flex-column gap-1'>
                <input type="text" placeholder='title' ref={titleRef}/>
                <input type="text" placeholder='image URL' ref={imageRef}/>
                <input type="text" placeholder='description' ref={descriptionRef}/>
                <button onClick={() => upload()}>Upload</button>
                <div>{message}</div>
            </div>
        </div>
    );
};

export default UploadPage;