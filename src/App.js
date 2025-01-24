import React, {useState, useEffect, use} from 'react'
import {Route, Routes} from "react-router-dom";


import IndexPage from "./pages/IndexPage";
import Tollbar from "./components/Tollbar";
import UserPage from "./pages/UserPage";
import CurrentPost from "./pages/CurrentPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPage from "./pages/UploadPage";


function App() {

    const [secretKey, setSecretKey] = useState(null);
    const [username, setUsername] = useState(null);

    function set(secKey, usName){
        setSecretKey(secKey)
        setUsername(usName)
    }


    return (
        <div className='App'>
            <Tollbar setKey={secretKey} username={username}/>
            <div>

                <Routes>
                    <Route path="/" element={<IndexPage />} exact />
                    <Route path="/user/:username" element={<UserPage />}/>
                    <Route path="/singlePost/:username/:id" element={<CurrentPost setKey={secretKey} logInName={username}/>}/>
                    <Route path="/login" element={<Login set={set}/>}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/upload" element={<UploadPage setKey={secretKey}/>}/>
                </Routes>

            </div>
        </div>
    )
        ;
}

export default App;




