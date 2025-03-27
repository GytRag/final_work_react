import React, {useEffect, useState, useRef} from "react";
import useStore from "../store/main";
import http from "../plugin/https";
import UserCardComp from "../components/UserCardComp";
import {socket} from "../socket";

const MessagesPage = () => {
    const {userConnected, selected, setSelected, messages, setMessages  } = useStore((state) => state);

    const [chat, setChat] = useState(null);
    const inpRef = useRef(null);
    const [change, setChange] = useState(false);


    useEffect(() => {
        http.getToken("http://localhost:8001/getmessage")
            .then(data => {
                setChat(data.existChat)
            })
    }, [change]);

    useEffect(() => {
        // let select = null
        // socket.on("getSelected", data => {
        //     select = data
        // })
        const handleSendMessage = (data) => {
            if (data) {
                setSelected(data)
            }
        };

        const handleGotMessage = (data) => {
            if (data) {
                if (selected) {
                    if(selected.userOne_id === data.userOne_id && selected.userTwo_id === data.userTwo_id) setSelected(data)
                }
            }
        };

        const handleGetChat = (data) => {
            console.log(data)
        };

        socket.on("sendMessage", handleSendMessage);
        socket.on("gotMessage", handleGotMessage);
        socket.on("getChat", handleGetChat);

        return () => {
            socket.off("gotMessage", handleGotMessage);
            socket.off("sendMessage", handleSendMessage);
            socket.off("getChat", handleGetChat);
        };

    },[]);


    function sendMessage() {
        let item = {
            message: inpRef.current.value,
        }
        if (selected.userOne === userConnected.username) {
            item.messTo = {
                _id: selected.userTwo_id,
                username: selected.userTwo,
                image: selected.userTwo_image,
            }
        } else {
            item.messTo = {
                _id: selected.userOne_id,
                username: selected.userOne,
                image: selected.userOne_image,
            }
        }
        http.postToken("http://localhost:8001/sendmessage/", item)
            .then(data => {
                if (data.success) {
                    inpRef.current.value = null;
                    setSelected(data.conversation)
                    setChange(!change)
                }
            })
    }

    function deleteMessage(mess) {

        const item = {
            chat_id: selected._id,
            mess
        }
        http.postToken("http://localhost:8001/deletemessage/", item)
            .then(data => {
                if(data.success) {
                    setSelected(data.updateChat)
                    setChange(!change)
                }
            })
    }


    return (
        <div>
            {chat && chat.length === 0 &&
                <div className='border border-black m-2 p-2 rounded-2 text-center'>
                    <h4>You have no messages</h4>
                </div>
            }

            {chat && chat.length > 0 && <div className='border border-black m-2 p-2 rounded-2 d-flex gap-2'>
                <div className='grow2'>
                    {chat && chat.map(x => <UserCardComp key={x._id} item={x}/>)}
                </div>

                <div className='grow3'>
                    {selected &&
                        <div className='border p-2 rounded-2 d-flex flex-column justify-content-between h-100'>
                            <div className='overflow-auto mb-2'>
                                {selected.messages.map((x, i) =>
                                    <div key={i}>
                                        {x.sender === userConnected._id ?
                                            <div>
                                                <div
                                                    className='timeStamp d-flex justify-content-end align-items-center'>{new Intl.DateTimeFormat('lt-LT', {
                                                    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
                                                    minute: '2-digit', second: '2-digit', timeZone: 'Europe/Vilnius',
                                                    hour12: false
                                                }).format(x.timestamp)}
                                                    <button onClick={() => deleteMessage(x)}
                                                            className='delMess my-1 py-0 border-0 px-1 ms-1'>delete
                                                    </button>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                 <span style={{backgroundColor: "lightblue"}}
                                                       className='p-1 rounded-1'>{x.message}</span>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div
                                                    className='timeStamp d-flex justify-content-start align-items-center'>{new Intl.DateTimeFormat('lt-LT', {
                                                    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit',
                                                    minute: '2-digit', second: '2-digit', timeZone: 'Europe/Vilnius',
                                                    hour12: false
                                                }).format(x.timestamp)}
                                                </div>
                                                <div className='d-flex justify-content-start'>
                                                    <span style={{backgroundColor: "lightgray"}}
                                                          className='p-1 rounded-1'>{x.message}</span>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )}
                            </div>

                            <div>
                                <input type="text" placeholder="message" ref={inpRef}/>
                                <button onClick={sendMessage}>send</button>
                            </div>
                        </div>
                    }
                </div>

            </div>}
        </div>

    );
};

export default MessagesPage;