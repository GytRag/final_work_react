import {useState, useRef} from "react";
import useStore from "../store/main";
import {useNavigate} from "react-router-dom";
import http from '../plugin/https'

const ProfilePage = () => {

    const navigate = useNavigate();

    const {userConnected, setUserConnected, setFavorites} = useStore((state) => state);
    const [change, setChange] = useState(false);
    const [error, setError] = useState(null);
    const [errorUsername, setErrorUsername] = useState(null);
    const [errorNewPassword, setErrorNewPassword] = useState(null);
    const[errorUrl, setErrorUrl] = useState(null);

    const usernameRef = useRef(null);
    const imageRef = useRef(null);
    const passwordRef = useRef(null);
    const newPassRef = useRef(null);
    const newPassRepeatRef = useRef(null);

    function updateUsername() {
        const item = {
            username: usernameRef.current.value
        }
        if (!item.username) return setErrorUsername("Add username")
        http.postToken("http://localhost:8001/updateusername", item)
            .then(data => {
                if (!data.success) setErrorUsername(data.message)
                if (data.success) {
                    setErrorUsername(null)
                    setUserConnected(data.user)
                    setFavorites(data.user.favorites)
                    usernameRef.current.value = null
                    setChange(!change)
                }
            })
    }

    function updateImg() {
        const item = {
            image: imageRef.current.value
        }

        if (!item.image) return setErrorUrl("Add url")
        http.postToken("http://localhost:8001/updateimg", item)
            .then(data => {
                if (!data.success) setErrorUrl(data.message)
                if (data.success) {
                    setUserConnected(data.user)
                    imageRef.current.value = null
                    setChange(!change)
                }
            })
    }

    function deleteUser() {
        const item = {
            password: passwordRef.current.value
        }

        http.postToken("http://localhost:8001/deleteuser", item)
            .then(data => {
                if (!data.success) setError(data.message)
                if (data.success) {
                    setError(null)
                    setUserConnected(null);
                    setFavorites(null)
                    localStorage.setItem("token", null)
                    navigate('/register')
                }
            })
    }

    function updatePassword() {
        const item = {
            passOne: newPassRef.current.value,
            passTwo: newPassRepeatRef.current.value
        }

        if (!item.passOne) return setErrorNewPassword("Add password")
        if (item.passOne !== item.passTwo) return setErrorNewPassword("Passwords do not match")

        http.postToken("http://localhost:8001/updatepassword", item)
            .then(data => {
                if (!data.success) setErrorNewPassword(data.message)
                if (data.success) {
                    setErrorNewPassword(data.message)
                    newPassRef.current.value = null
                    setChange(!change)
                }
            })
    }


    return (
        <div>
            {userConnected && <div className='m-2 gap-1 p-2 d-flex'>
                <div className='gap-1 p-2 d-flex flex-column align-items-center border rounded-2'>
                    <div>
                        <img className='userImg' src={userConnected.image} alt=""/>
                    </div>
                    <div>
                        <input type="text" placeholder='image url' ref={imageRef}/>
                    </div>
                    {errorUrl && <div>{errorUrl}</div>}
                    <div>
                        <button onClick={updateImg}>Change photo</button>
                    </div>
                </div>
                <div className='gap-1 p-2 d-flex flex-column align-items-center'>


                    <div className='border rounded-2 p-2 gap-1 p-2 d-flex flex-column align-items-center'>
                        <div>
                            <input type="text" placeholder='new username' ref={usernameRef}/>
                        </div>
                        {errorUsername && <div>{errorUsername}</div>}
                        <div>
                            <button onClick={updateUsername}>Change username</button>
                        </div>
                    </div>

                    <div className='border rounded-2 p-2 gap-1 p-2 d-flex flex-column align-items-center'>
                        <div>
                            <input type="password" placeholder='new password' ref={newPassRef}/>
                        </div>
                        <div>
                            <input type="password" placeholder='new password repeat' ref={newPassRepeatRef}/>
                        </div>
                        {errorNewPassword && <div>{errorNewPassword}</div>}
                        <div>
                            <button onClick={updatePassword}>Change password</button>
                        </div>
                    </div>

                    <div className='border rounded-2 p-2 gap-1 p-2 d-flex flex-column align-items-center'>
                        <div>
                            <input type="password" placeholder='password' ref={passwordRef}/>
                        </div>
                        {error && <div>{error}</div>}
                        <div>
                            <button onClick={deleteUser}>Delete account</button>
                        </div>
                    </div>

                </div>
            </div>}


        </div>
    );
};

export default ProfilePage;