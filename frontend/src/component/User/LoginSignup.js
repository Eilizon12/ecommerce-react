import React, { Fragment, useRef, useState} from "react";
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";


const LoginSignup = () => {

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);


    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    const loginSubmit = () => {
        console.log("Form Submited")
    }



    const switchTabs = (e, tab) => {
        if(tab === "login"){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab === "register"){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }

    };














  return (
    <Fragment>
        <div className="loginContainer">
            <div className="loginBox">
                <div>
                    <div className="login_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>
                <form className="loginForm" ref = {loginTab} onSubmit={loginSubmit}>
                    <div className="loginEmail">
                        <MailOutlineIcon />
                        <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>

                    <div className="loginPassword">
                        <LockOpenIcon />
                        <input type="password" placeholder="Password"  required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
                    </div>
                    <Link to= "/password/forgot">Forgot Password ?</Link>
                    <input type="submit" value="Login" className="loginBtn" />

                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default LoginSignup