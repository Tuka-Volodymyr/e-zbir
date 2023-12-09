import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import LoginForm from "./components/LoginForm/LoginForm";
import RegForm from "./components/RegForm/RegForm";
import Header from "./components/Header/Header";
import ForgPassw from "./components/ForgPassw/ForgPassw";
import MainPage from "./components/MainPage/MainPage";
import CheckForm from "./components/CheckForm/CheckForm";
import Profile from "./components/Profile/Profile"
import PrivateRoute from "./util/router/PrivateRoute";
import Fundraiser from "./components/Fundraiser/Fundraiser";
import UserPage from "./components/UserPage/UserPage";

import './App.css';
import FundraiserItem from "./components/Fundraiser/FundraiserItem/FundraiserItem";

const App = (props) =>{

    if(window.sessionStorage.getItem('isLogin') == null){
        window.sessionStorage.setItem('isLogin', false)
    }

    return (
        <BrowserRouter>
            <div className="content">
                <Header />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route element={<PrivateRoute role='user' redirect = 'profile' />}>
                        <Route path="/login" element={<LoginForm />} />
                    </Route>
                    <Route element={<PrivateRoute role='user' redirect = 'profile' />}>
                        <Route path="/register" element={<RegForm />} />
                    </Route>
                    <Route path="/checkform" element={<CheckForm />} />
                    <Route element={<PrivateRoute role='anonim' redirect = 'login' />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/ver" element={<ForgPassw />} />
                    <Route path="/fundraiser" element={<Fundraiser />} />
                    <Route path="/fundraiser/:id" element={<FundraiserItem />} />
                    <Route path="/user/:id" element={<UserPage />} />
                </Routes>
            </div>
        </BrowserRouter>

);
}

export default App;