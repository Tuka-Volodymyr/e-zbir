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

import './App.css';

const App = (props) =>{
    return (
        <BrowserRouter>
          <div className="content">
            {<Header />}
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegForm />} />
            <Route path="/ver" element={<ForgPassw />} />
            <Route path="/main" element={<MainPage />} />
            
            </Routes>
          </div>
        </BrowserRouter>

);
}

export default App;