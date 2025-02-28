import {Route, Routes} from "react-router-dom";
import AllUsersPage from "./pages/AllUsersPage";
import Tollbar from "./components/Tollbar";
import LoginPage from "./pages/LoginPage";
import {socket} from "./socket";
import RegisterPage from "./pages/RegisterPage";


function App() {



    return (
        <div className='App'>
            <Tollbar />
            <div>

                <Routes>
                    <Route path="/" element={<AllUsersPage socket={socket}/>}  />
                    <Route path="/login" element={<LoginPage socket={socket}/>}  />
                    <Route path="/register" element={<RegisterPage />}  />

                </Routes>

            </div>
        </div>
    )
        ;
}

export default App;




