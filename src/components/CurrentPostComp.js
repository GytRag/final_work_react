import React, {useState, useRef, useEffect} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const CurrentPostComp = ({item, setKey, logInName}) => {

   const [updateTitle, setUpdateTitle] = useState(false);
   const [updateImage, setUpdateImage] = useState(false);
   const [updateDescr, setUpdateDescr] = useState(false);
   const [trigger, setTrigger] = useState(false);

   const titleRef = useRef(null);
   const imageRef = useRef(null);
   const DescrRef = useRef(null);

   const [textAreaHeight, setTextAreaHeight] = useState(null);
   const [textAreaWidth, setTextAreaWidth] = useState(null);

   const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {}, [updateTitle, updateImage, updateImage, error, textAreaHeight, trigger])

    function deletePost() {
        // keys to send
        // name, password

        const myUser = {
            secretKey: setKey,
            id: item.id
        };

        // update object 'option'
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myUser)
        };
        fetch("http://167.99.138.67:1111/deletepost", option)
            .then(res => res.json())
            .then(response => {
                navigate(`/user/${item.username}`)
            })
    }


    function updatePost() {
        let upPost = {
            secretKey: setKey,
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image
        }

        if(updateTitle) upPost.title = titleRef.current.value;
        if(updateImage) upPost.image = imageRef.current.value;
        if(updateDescr) upPost.description = DescrRef.current.value;


        // update object 'option'
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(upPost)
        };
        fetch("http://167.99.138.67:1111/updatepost", option)
            .then(res => res.json())
            .then(response => {
                if(response.success)navigate(`/user/${item.username}`)
                if(!response.success)setError(response.message)
            })


    }

    function handleKeyDown(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    function upDescription(e) {
        if(setKey && logInName === item.username){
            setTextAreaHeight(e.target.scrollHeight)
            setTextAreaWidth(e.target.scrollWidth)
            setUpdateDescr(true)
            setTrigger(true)
        }

    }

    function upTitle() {
        if(setKey && logInName === item.username){
            setUpdateTitle(true)
            setTrigger(true)
        }
    }
    function upImage() {
        if(setKey && logInName === item.username){
            setUpdateImage(true)
            setTrigger(true)
        }
    }
    function cancelUpdate() {
        setUpdateTitle(false)
        setUpdateImage(false)
        setUpdateDescr(false)
        setTrigger(false)
    }


    return (

            <div className='grow1 d-flex border flex-column border-dark rounded-2 p-2 currentPost justify-content-between'>


                <div onDoubleClick={upImage} className='d-flex justify-content-center mb-2 imgDiv'>
                    {updateImage ? <input type="text" ref={imageRef} defaultValue={item.image}/>
                        :
                        <img className="offClick" src={item.image} alt=""/>}
                </div>

                <div className='text-center'
                    onDoubleClick={upTitle}>
                    {updateTitle ? <input type="text" ref={titleRef} defaultValue={item.title}/>
                        :
                        <h5 className="offClick">{item.title}</h5>}
                </div>

                <div onDoubleClick={upDescription} className='text-center'>
                    {updateDescr ? <textarea onChange={handleKeyDown}
                           style={{height: textAreaHeight? textAreaHeight + 'px': 'auto',
                               width: textAreaWidth? textAreaWidth + 'px': 'auto'}}
                            className='textArea' ref={DescrRef} defaultValue={item.description}>
                        </textarea>
                        :
                        <p className="offClick">{item.description}</p>}
                </div>

                <div>
                    <Link className='userLink' to={`/user/${item.username}`}> {item.username} </Link>
                </div>

                {error !== null && <div className='my-2' style={{color: "#fa4747"}}>
                    {error}
                </div>}

                <div className='d-flex justify-content-between align-items-center'>
                    <small>{new Date(item.timestamp).toLocaleString('lt-LT', {timeZone: 'Europe/Vilnius'})}</small>
                    {setKey && logInName === item.username && !trigger && <div>
                        <button onClick={() => deletePost()}>DELETE</button>
                    </div>}
                    {setKey && logInName === item.username && trigger &&
                        <div>
                        <button className='ms-1' onClick={() => updatePost()}>UPDATE</button>
                        <button className='ms-1' onClick={() => cancelUpdate()}>CANCEL UPDATE</button>
                    </div>}

                </div>


            </div>

    );
};

export default CurrentPostComp;