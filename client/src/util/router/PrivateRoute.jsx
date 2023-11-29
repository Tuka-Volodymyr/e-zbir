import {Navigate, Outlet} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const PrivateRoute = (props) =>{
    const isLogin = useSelector(state => state.userInfo)

    return(
        isLogin.login === 'true' ? <Navigate to = {`/${props.redirect}`}/> : <Outlet/>
    );
};

export default PrivateRoute;