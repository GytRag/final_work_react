import React, {useRef} from 'react';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import useStore from "../store/main";

const ModalComp = ({modal, handleClose, item}) => {
    const {loggedInUser, conversation, updateConversation, haveCon, updateHaveCon} = useStore((state) => state);

    const inpRef = useRef(null);


    function sendMessage() {

        const sendName = loggedInUser.username;
        const recName = item.username;
        const messageInp = inpRef.current.value;


        if(!haveCon) {
            updateHaveCon([sendName, recName])
        }else {
            let existsFirstName = false
            let existsSecondName = false

            haveCon.map((x) => {
                if(x === sendName) existsFirstName = true
                if(x === recName) existsSecondName = true
            })
            if(!existsFirstName) updateHaveCon([...haveCon, sendName])
            if(!existsSecondName) updateHaveCon([...haveCon, recName])
        }




        const conversationObj = {
            senderName: sendName,
            recipientName: recName,
            messages: [{
                sender: sendName,
                message: messageInp,
            }]
        }
        updateConversation([...conversation, conversationObj])
        handleClose()
    }


    return (
        <Modal show={modal} onHide={handleClose}>
            <Modal.Body>
                <input className='inputBlue w-100' type="text" placeholder="message text" ref={inpRef}/>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-center'>
                <Button className='btnBgGreen' onClick={handleClose}>
                    CLOSE
                </Button>
                <Button className='btnBgGreen' onClick={sendMessage}>
                    SEND
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComp;