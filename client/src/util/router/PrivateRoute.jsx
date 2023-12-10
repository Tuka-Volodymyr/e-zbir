import {Navigate, Outlet} from "react-router-dom";
// import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const PrivateRoute = (props) =>{
    const [isLogin, setIsLogin] = useState(window.sessionStorage.getItem('isLogin'))

    useEffect(() => {
        setIsLogin(window.sessionStorage.getItem('isLogin'))
    }, [window.sessionStorage.getItem('isLogin')]);

    let login;
    props.role === 'user' ? login = true : login = false

    return(
        isLogin === `${login}` ? <Navigate to = {`/${props.redirect}`}/> : <Outlet/>
    );
};

export default PrivateRoute;