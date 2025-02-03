import useStore from "../store/main";
import addPoke from "../components/addPoke";
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

const UserProfilePage = () => {

    const {userConnected, updateUserConnected, updateUsers} = useStore((state) => state)
    const [error, setError] = useState(null);
    const inpRef = useRef(null);

    const navigate = useNavigate();

    function deleteAccount() {
        const userPws = {
            password: inpRef.current.value
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPws)
        }
        console.log(options)
        fetch("http://localhost:8001/deleteAccount", options)
            .then(res => res.json())
            .then(data => {
                if(data.error) setError(data.message)
                if(!data.error) {
                    setError(null)
                    updateUserConnected(null)
                    updateUsers(null)
                    navigate('/register')
                    console.log(data.message)
                }
            })


    }


    return (
        <div className='m-2'>

            {userConnected && <div className='mb-2'>
                <div className='d-flex flex-column gap-1 align-items-center'>
                    <input type="password" placeholder='password' ref={inpRef}/>
                    {error && error}
                    <button onClick={deleteAccount}>Delete</button>
                </div>
            </div>}
            
            
            {userConnected && userConnected.map((user, i) =>
                <div className="border rounded-2 mb-1 p-2 d-flex justify-content-between align-items-center" key={i}>
                    <div>
                        <div>you where poked by <b>{user.name}</b></div>
                        <div>{user.time}</div>
                    </div>

                    <div onClick={() => addPoke(user.name)} className='fs-2 cursor-point poke'>🫵</div>

                </div>)}

        </div>
    );
};

export default UserProfilePage;