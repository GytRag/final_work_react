import React, {useState} from 'react';
import useStore from "../store/main";
import http from "../plugin/https";
import {socket} from "../socket";

const UserCardComp = ({item, change, setChange, setConvers}) => {

    const {userConnected, messages, setMessages, selected, setSelected } = useStore((state) => state);
    const [chatWith, setChatWith] = useState(null);

    if (!chatWith) {
        if (userConnected.username === item.userOne) {
            setChatWith({
                name: item.userTwo,
                id: item.userTwo_id,
                image: item.userTwo_image
            })
        } else {
            setChatWith({
                name: item.userOne,
                id: item.userOne_id,
                image: item.userOne_image
            })
        }
    }

    function select() {
        if(selected){
            if(selected._id === item._id) {
                setSelected(null)
                setMessages(null)
                setConvers(null)
                setChange(!change)
            }
            if(selected._id !== item._id) {
                setSelected(item)
                setMessages(item.messages)
                setConvers(item)
                setChange(!change)
            }
        } else {
            setSelected(item)
            setConvers(item)
            setChange(!change)
        }

    }

    function deleteChat() {
        const chat = {
            chat_id: item._id,
        }

        if(selected && selected._id === item._id) if(selected === item) setSelected(null)

        http.postToken("http://localhost:8001/deletechat/", chat)
            .then(data => {})
    }

    return (
        <div className='mb-2'>
            {chatWith &&
                <div style={{backgroundColor: selected? selected._id === item._id? "lightblue":"" : ""}}
                    className='d-flex align-items-center gap-2 border rounded-2 p-2'>
                    <div onClick={select}
                        className='d-flex align-items-center gap-2 cursor-point w-100'>
                        <div><img className='chatImg' src={chatWith.image} alt=""/></div>
                        <div>{chatWith.name}</div>
                    </div>
                    <button onClick={deleteChat} className='text-nowrap'>Delete chat</button>
                </div>
            }
        </div>
    );
};

export default UserCardComp;