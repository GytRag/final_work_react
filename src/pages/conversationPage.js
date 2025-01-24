import React, {useState, useRef, useEffect} from 'react';
import useStore from "../store/main";

const ConversationPage = () => {
    const {conversation, updateConversation, loggedInUser, haveCon} = useStore((state) => state);
    const inpRef = useRef(null);

    const [newConversation, setNewConversation] = useState(conversation);
    const [talkingTo, setTalkingTo] = useState(null);
    const [clicked, setClicked] = useState(null);

    const [change, setChange] = useState(true)


    useEffect(() => {},[change])

    function openChatWindow(x, i) {
        setTalkingTo(x)
        setClicked(i)
    }

    function sendMessage() {
        const newMessage = {
            sender: loggedInUser.username,
            message: inpRef.current.value
        }
        newConversation[clicked].messages.push(newMessage);
        inpRef.current.value = '';
        updateConversation(newConversation)
        setChange(!change);
    }



    return (
        <div className='d-flex border border-black rounded-2 m-2'>
            <div className='m-1 grow1'>
                {conversation.map((x, i) =>
                    <div key={i} >
                        {x.senderName === loggedInUser.username &&
                            <div onClick={() => openChatWindow(x, i)}
                              style={{backgroundColor: clicked === i ? 'lightgreen' : ''}}
                              className='border border-black rounded-2 mb-1 p-2 cursor-point'>
                                <div>conversation with:</div>
                                {x.senderName === loggedInUser.username && <div>{x.recipientName}</div>}
                                {x.recipientName === loggedInUser.username && <div>{x.senderName}</div>}
                            </div>}

                        {x.recipientName === loggedInUser.username &&
                            <div onClick={() => openChatWindow(x, i)}
                                 style={{backgroundColor: clicked === i ? 'lightgreen' : ''}}
                                 className='border border-black rounded-2 mb-1 p-2 cursor-point'>
                                <div>conversation with:</div>
                                {x.senderName === loggedInUser.username && <div>{x.recipientName}</div>}
                                {x.recipientName === loggedInUser.username && <div>{x.senderName}</div>}
                            </div>}
                    </div>
                )}
            </div>

            {talkingTo &&
                <div className='m-1 border border-black rounded-2 grow3 d-flex flex-column justify-content-between'>

                    <div>
                        {talkingTo.messages.map((x, i) =>
                            <div key={i}
                                 className={x.sender === talkingTo.senderName?
                                     'm-1 d-flex justify-content-end':
                                     'm-1 d-flex justify-content-start'}>
                                <div className='border border-black rounded-2 p-1'> {x.message} </div>
                            </div>)}
                    </div>

                    <div className="m-1 d-flex">
                        <input type="text" className='w-100 me-1' placeholder='message text' ref={inpRef}/>
                        <button onClick={sendMessage}>send</button>
                    </div>

                </div>}
        </div>
    );
};

export default ConversationPage;