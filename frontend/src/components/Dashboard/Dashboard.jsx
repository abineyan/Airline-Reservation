import React, { useState, useContext } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {

  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      status: false,
      admin: false
    });
    navigate("/loginadmin")
  };
  let [open, setOpen] = useState(false);
  return (
    <section>
      
      <div className="shadow-md w-full fixed top-0  bg-white left-0 py-3">
        <div className="md:flex items-center justify-between md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-[#F97827] mr-1 pt-0">B Airline</span>
          </div>
        </div>
      </div>
      <div
        class="bg-white w-full md:w-60 flex-col md:flex hidden shadow h-screen pt-20"
        id="sideNav"
      >
        <nav className="mt-6">
          <Link
            class="text-left block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white no-underline"
            to="/admin"
          >
            Add Flight
          </Link>
          <Link
            class="text-left block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
            to="/admin/addaircraft"
          >
            Add Aircraft
          </Link>
          <Link
            class="text-left block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
            to="/admin/addroute"
          >
            Add Route
          </Link>
          <Link
            class="text-left block text-gray-500 py-2.5 px-4 my-4 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
            to="/admin/addairport"
          >
            Add Airport
          </Link>

          <div class="dropdown w-full">
            <button className="text-left w-full block text-gray-500 py-2.5 px-4 mt-2 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline">
              Get Reports
            </button>
            <div className="dropdown-content hidden absolute bg-gray-100 w-full z-10 hover:flex">
              <a
                className="text-left block text-gray-500 py-2.5 px-4 my-0 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
                href="#"
              >
                Get passenger count for given destination
              </a>
              <a
                className="text-left block text-gray-500 py-2.5 px-4 my-0 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
                href="#"
              >
                Get passenger count for given passenger type
              </a>
              <a
                className="text-left block text-gray-500 py-2.5 px-4 my-0 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
                href="#"
              >
                Get passengers from flight Id
              </a>
              <a
                className="text-left block text-gray-500 py-2.5 px-4 my-0 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
                href="#"
              >
                Flight History
              </a>
              <a
                className="text-left block text-gray-500 py-2.5 px-4 my-0 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white  no-underline"
                href="#"
              >
                Get Revenue
              </a>
            </div>
          </div>
        </nav>
      </div>


      {/* Log Out Item */}
      <button className="text-left block text-gray-500 py-2.5 px-4 rounded transition duration-0 hover:bg-gradient-to-r hover:from-orange-600 hover:to-white-20 hover:text-white mt-auto  no-underline"
        onClick={logout}>


        Log Out

      </button>
      <div class="bg-gradient-to-r from-[#F97827] to-white h-px mb-2"></div>

      <p class="mb-1 px-2 py-3 text-left text-xs font- text-[#F97827]">
        &copy; {new Date().getFullYear()} All Rights Reserved.
      </p>

    </section >
  );
};

export default Dashboard;
