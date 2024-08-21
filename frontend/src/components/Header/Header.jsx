import React, {useContext} from "react";
import Logo from "../../images/Logo.png";
import "./Header.css";
import Banner from "../Banner/Banner";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate } from "react-router-dom";


const Header = () => {

  const navigate = useNavigate();

  const {authState, setAuthState} = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      status: false,
      admin: false
    });
    navigate("/login")
  };

  return (
    <section className="h-wrapper">
      <div className="flex fixed justify-around flex-wrap p-3 top-0 left-0 right-0 bg-slate-100 w-full">
        <div className="flex-col justify-center ">
          <h1 className=" text-4xl text-[#f97827]">B Airlines</h1>
        </div>
        <div className="flexCenter h-menu no-underline">
          <Link className="no-underline" to="/">
            Home
          </Link>
          <Link className="no-underline" to="/ourvalues">
            OurValues
          </Link>
          {!authState.status ? (
          <Link className="no-underline" to="/login">
            Login
          </Link>
          ) : (
            <button onClick={logout} className="no-underline" style={{ color: '#0d6efd' }}>Logout</button>

          )}
          <button className="button">
            <Link to="/book" className="no-underline">
              Book Your Flight
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
