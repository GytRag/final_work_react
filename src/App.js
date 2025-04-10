import React from 'react'
import {Route, Routes, useLocation } from "react-router-dom";

import IndexPage from './pages/IndexPage'
import ProfilePage from "./pages/ProfilePage";
import Tollbar from "./components/Tollbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import FavoritePage from "./pages/FavoritePage";
import SinglePostPage from "./pages/SinglePostPage";
import SingleUserPage from "./pages/SingleUserPage";
import MessagesPage from "./pages/MessagesPage";
import useStore from "./store/main";

function App() {

    const {mainLink} = useStore((state) => state);
    const location = useLocation();
    const showToolbar = location.pathname.startsWith(mainLink);

    return (
        <div className='App'>
            <Tollbar />
            <div>

                <Routes>
                    <Route path={mainLink + "/"} element={<IndexPage />} />
                    <Route path={mainLink + "/profile"} element={<ProfilePage />}  />
                    <Route path={mainLink + '/register'} element={<RegisterPage />} />
                    <Route path={mainLink + '/login'} element={<LoginPage />} />
                    <Route path={mainLink + '/favorites'} element={<FavoritePage />} />
                    <Route path={mainLink + '/create-post'} element={<CreatePage />} />
                    <Route path={mainLink + '/post/:post_id'} element={<SinglePostPage />} />
                    <Route path={mainLink + '/user/:username'} element={<SingleUserPage />} />
                    <Route path={mainLink + '/messages'} element={<MessagesPage />} />
                </Routes>

            </div>
        </div>
    )
        ;
}

export default App;




