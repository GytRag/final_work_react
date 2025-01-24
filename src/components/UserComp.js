import React, {useState, useEffect} from 'react';
import useStore from "../store/main";
import ModalComp from "./ModalComp";
import {useNavigate} from "react-router-dom";

const UserComp = ({item}) => {

    const navigate = useNavigate();

    const {loggedInUser, conversation, updateConversation} = useStore((state) => state);

    const [modal, setModal] = useState(false)
    const handleClose = () => {setModal(false)};

    const handleShow = () => {

        let goGo = false

            conversation.map((x) => {
                if(x.recipientName === loggedInUser.username){
                    goGo = true
                }
                if(x.senderName === loggedInUser.username && x.recipientName === item.username){
                    goGo = true
                }
            })

        if(goGo){
            navigate("/conversations")
        }else {setModal(true)}

    };
    useEffect(() => {}, [modal])



    return (
        <div className='d-flex gap-1 border border-black rounded-2 p-2'>
            <img className='image' src={item.image} alt=""/>
            <div className='d-flex flex-column justify-content-between'>
                <div>{item.username}</div>
                {item.username !== loggedInUser.username &&
                    <button onClick={handleShow}
                        className='fs-14'>send message</button>}

                {modal && <ModalComp handleClose={handleClose} modal={modal} item={item} />}
            </div>

        </div>
    );
};

export default UserComp;