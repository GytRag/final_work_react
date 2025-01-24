import React, {useState, useEffect, use} from 'react'
import {Route, Routes} from "react-router-dom";


import IndexPage from "./pages/IndexPage";
import Tollbar from "./components/Tollbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreatPostPage from "./pages/CreatPostPage";
import AllPostsPage from "./pages/AllPostsPage";
import SinglePostPage from "./pages/SinglePostPage";
import ConversationPage from "./pages/conversationPage";




function App() {
    

    return (
        <div className='App'>
            <Tollbar />
            <div>

                <Routes>
                    <Route path="/" element={<IndexPage  />} exact />
                    <Route path="/register" element={<RegisterPage  />} />
                    <Route path="/login" element={<LoginPage  />} />
                    <Route path="/profile" element={<ProfilePage  />} />
                    <Route path="/createpost" element={<CreatPostPage  />} />
                    <Route path="/allposts" element={<AllPostsPage  />} />
                    <Route path="/singlepost/:id" element={<SinglePostPage  />} />
                    <Route path="/conversations" element={<ConversationPage  />} />
                </Routes>

            </div>
        </div>
    )
        ;
}

export default App;




