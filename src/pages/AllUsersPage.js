import React, {useEffect, useState, useRef} from "react";
import useStore from "../store/main";
import http from '../plugins/https'
import UserCardComp from "../components/UserCardComp";



const AllUsersPage = ({socket}) => {

    const {user, setAllUsers, allUsers} = useStore((state) => state);
    const [selected, setSelected] = useState(null);
    const [messages, setMessages] = useState([]);
    const messageRef = useRef(null);
    const [notification, setNotification] = useState([]);
    const [usersOnline, setUsersOnline] = useState(null);


    useEffect(() => {
        http.get("http://localhost:8001")
            .then(res => {
                if (res.success) {
                    setAllUsers(res.users)
                }
            })
    }, [])


    useEffect(() => {

        let select = null

        socket.on("getSelected", data => {
            select = data
        })

        socket.on("allUsers", data => {
            setUsersOnline(data)
        })

        const handleSendMessage = (data) => {
            if (data) {
                setMessages((old) => [...old, data])
            }
        };

        const handleGotMessage = (data) => {
            if (data) {
                if(select) {
                    if(select._id === data.sender_id){
                        setMessages((old) => [...old, data])
                    }else {
                        setNotification((old) => [...old, data.sender_id])
                    }
                }else {
                    setNotification((old) => [...old, data.sender_id])
                }
            }
        };

        socket.on("sendMessage", handleSendMessage);
        socket.on("gotMessage", handleGotMessage);

        return () => {
            socket.off("gotMessage", handleGotMessage);
            socket.off("sendMessage", handleSendMessage);
        };

    }, [])




    function clickFriend(friend) {

        if (selected === friend) return setSelected(null)
        setSelected(friend)

        setNotification(notification.filter(filt => filt !== friend._id))

        socket.emit("setSelected", friend)

        http.get(`http://localhost:8001/messages/${friend._id}/${user._id}`)
            .then(res => {
                setMessages(res.messages)
            })


    }

    function sendMessage() {

        const message = messageRef.current.value;
        if (!message) return;

        const data = {
            getter_username: selected.username,
            getter_id: selected._id,
            sender_username: user.username,
            sender_id: user._id,
            message
        }

        http.post("http://localhost:8001/message", data)
            .then(res => {
                if (res.success) messageRef.current.value = null
            })
    }


    return (
        <div className='d-flex justify-content-center mt-2 gap-2'>
            <div className='d-flex gap-2 flex-column'>
                <div className='noPointer'>
                    {user && <UserCardComp item={user}/>}
                </div>

                {allUsers && user &&
                    <div className='chatFriends border border-black rounded-2 p-2 d-flex flex-column gap-1'>
                        <h2>Chat friends</h2>
                        {allUsers && allUsers.map(x =>
                            <div style={{backgroundColor: notification.find(f => f === x._id)? "lightpink":""}}
                                 className='rounded-2'
                                key={x._id}>
                                {x.username !== user.username &&
                                    <UserCardComp item={x}
                                                  socket={socket}
                                                  click={clickFriend}
                                                  selected={selected}
                                                  usersOnline={usersOnline}
                                    />}
                            </div>
                        )}
                    </div>
                }
            </div>

            {selected &&
                <div
                    className='chatWindow border border-black rounded-2 p-2 d-flex flex-column justify-content-between'>
                    <div className='overflow-auto'>
                        {messages && messages.map((x, i) =>
                            <div className={`d-flex ${user._id === x.getter_id ? "justify-content-end" : ""}`} key={i}>
                                <div style={{backgroundColor: user._id === x.getter_id ? "#82C2F4FF" : "#dfdfdf"}}
                                     className='border rounded-2 mb-1 p-1'>
                                    {x.message}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <input type="text" placeholder='message' ref={messageRef}/>
                        <button onClick={sendMessage}>send</button>
                    </div>
                </div>
            }

        </div>

    );
};

export default AllUsersPage;