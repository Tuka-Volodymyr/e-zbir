import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import LoginForm from "./components/LoginForm/LoginForm";
import RegForm from "./components/RegForm/RegForm";
import Header from "./components/Header/Header";


import './App.css';


const App = (props) =>{
    return (
        // <div className="wrapper">
        //     <HeaderLoginForm />
        //     <FooterLoginForm/>
        // </div>
        <BrowserRouter>
          <div className="content">
            {<Header />}
            <Routes>
              <Route path="/" element={<LoginForm />} />
              {/*<Route path="/login" element={} />*/}
              <Route path="/reg" element={<RegForm />} />
            </Routes>
          </div>
        </BrowserRouter>

);
}

export default App;