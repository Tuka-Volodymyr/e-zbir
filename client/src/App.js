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

const App = (props) =>{
    const user = window.localStorage.getItem('login')
    // const ProtectedRoute = ({ user, children }) => {
    //     console.log(user)
    //     if (!user) {
    //         return <Navigate to="/profile" replace />;
    //     }
    //
    //     return children;
    // };
    return (
        <BrowserRouter>
            <div className="content">
                {<Header />}
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/main" element={<MainPage />} />
                    {/*<Route*/}
                    {/*    path="/login"*/}
                    {/*    element={*/}
                    {/*        <ProtectedRoute user={user}>*/}
                    {/*            <LoginForm />*/}
                    {/*        </ProtectedRoute>*/}
                    {/*    }*/}
                    {/*/>*/}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegForm />} />
                    <Route path="/checkform" element={<CheckForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/ver" element={<ForgPassw />} />
                </Routes>
            </div>
        </BrowserRouter>

);
}

export default App;