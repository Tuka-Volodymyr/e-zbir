import {
    BrowserRouter, Navigate,
    Route,
    Routes,
} from "react-router-dom";

import LoginForm from "./components/LoginForm/LoginForm";
import RegForm from "./components/RegForm/RegForm";
import Header from "./components/Header/Header";
import ForgPassw from "./components/ForgPassw/ForgPassw";
import MainPage from "./components/MainPage/MainPage";
import CheckForm from "./components/ CheckForm/CheckForm";
import Profile from "./components/Profile/Profile"

import './App.css';
import PrivateRoute from "./util/router/PrivateRoute";
import AllZbir from "./components/AllZbir/AllZbir";
import UserPage from "./components/UserPage/UserPage";

const App = (props) =>{
    return (
        <BrowserRouter>
            <div className="content">
                {<Header />}
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route element={<PrivateRoute redirect = 'profile' />}>
                        <Route path="/login" element={<LoginForm />} />
                    </Route>
                    <Route element={<PrivateRoute redirect = 'profile' />}>
                        <Route path="/register" element={<RegForm />} />
                    </Route>
                    <Route path="/checkform" element={<CheckForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/ver" element={<ForgPassw />} />
                    <Route path="/zbir" element={<AllZbir />} />
                    <Route path="/user" element={<UserPage />} />
                </Routes>
            </div>
        </BrowserRouter>

);
}

export default App;