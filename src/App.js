import React from 'react'
import {Route, Routes} from "react-router-dom";


import IndexPage from "./pages/IndexPage";
import Tollbar from "./components/Tollbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";



function App() {



    return (
        <div className='App'>
            <Tollbar />
            <div>

                <Routes>
                    <Route path="/" element={<IndexPage />} exact />
                    <Route path="/register" element={<RegisterPage />} exact />
                    <Route path="/login" element={<LoginPage />} exact />
                    <Route path="/user" element={<UserProfilePage />} exact />

                </Routes>

            </div>
        </div>
    )
        ;
}

export default App;




