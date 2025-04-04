import React, {useState} from 'react';
import useStore from "../store/main";
import http from "../plugin/https";

const UserCardComp = ({item, change, setChange}) => {

    const {userConnected, selected, setSelected, newMessages, setNewMessages, setConvers } = useStore((state) => state);
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
        setChange(!change)
        if(selected){
            if(selected._id === item._id) {
                setSelected(null)
                setConvers(null)
            }
            if(selected._id !== item._id) {
                setSelected(item)
                setConvers(item)
                setNewMessages(newMessages.filter(fil => fil !== item._id))
            }
        } else {
            setSelected(item)
            setConvers(item)
            setNewMessages(newMessages.filter(fil => fil !== item._id))
        }

    }

    function deleteChat() {
        const chat = {
            chat: item,
        }

        setNewMessages(newMessages.filter(fil => fil !== item._id))

        if(selected && selected._id === item._id) if(selected === item) {
            setSelected(null)
            setConvers(null)
        }
        http.postToken("/deletechat/", chat)
            .then(data => {})
    }

    function fin() {
        return newMessages.find(fin => fin === item._id)
    }

    const colorGet = '#ddcdcd'
    const colorSet = '#e8e8e8'
    const colorNo = '#FFFFFF'

    return (
        <div className='mb-2'>
            {chatWith &&
                <div style={{backgroundColor: selected? selected._id === item._id? colorSet:fin()?colorGet:colorNo : fin()?colorGet:colorNo}}
                    className='d-flex align-items-center gap-2 shadow rounded-2 p-2'>
                    <div onClick={select}
                        className='d-flex align-items-center gap-2 cursor-point w-100'>
                        <div><img className='chatImg' src={chatWith.image} alt=""/></div>
                        <div>{chatWith.name}</div>
                    </div>
                    <button onClick={deleteChat} className='text-nowrap btn btn-outline-dark'>Delete chat</button>
                </div>
            }
        </div>
    );
};

export default UserCardComp;