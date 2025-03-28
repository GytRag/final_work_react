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
        http.postToken("http://localhost:8001/deletechat/", chat)
            .then(data => {})
    }

    function fin() {
        return newMessages.find(fin => fin === item._id)
    }

    return (
        <div className='mb-2'>
            {chatWith &&
                <div style={{backgroundColor: selected? selected._id === item._id? "lightblue":fin()?"#fbc058":"" : fin()?"#fbc058":""}}
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