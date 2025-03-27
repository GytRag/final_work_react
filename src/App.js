import React from 'react'
import {Route, Routes} from "react-router-dom";

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






function App() {



    return (
        <div className='App'>
            <Tollbar />
            <div>

                <Routes>
                    <Route path="/" element={<IndexPage />}  />
                    <Route path="/profile" element={<ProfilePage />}  />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/favorites' element={<FavoritePage />} />
                    <Route path='/create-post' element={<CreatePage />} />
                    <Route path='/post/:post_id' element={<SinglePostPage />} />
                    <Route path='/user/:username' element={<SingleUserPage />} />
                    <Route path='/messages' element={<MessagesPage />} />
                </Routes>

            </div>
        </div>
    )
        ;
}

export default App;




