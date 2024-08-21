import React, { useContext } from "react";
import airplaneImage from "../../images/planegirl.png";
import { Link } from "react-router-dom";
import Airhostess from "../../images/Airhostess.png";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";


function Login() {

  const navigate = useNavigate();
  const {setAuthState} = useContext(AuthContext);

  const initialValues = {
    username: "",
    password: ""
  };

  const onSubmit = (data) => {
    console.log("on click");
    axios.post("http://localhost:3001/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data);
          setAuthState({
            username: data.username,
            status: true,
            admin: false
          });
          navigate("/");
        }
      })

      .catch((error) => {
        console.error("Error in post request:", error);
      })

  }

  return (


    <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-10">
      {/* Login Container */}
      <div
        className="bg-gray-100 flex rounded-2xl 
      shadow-lg max-w-3xl p-4 items-center"
      >
        <div className="md:w-1/2 px-16">
          <h2 className="font-bold text-4xl pl-10 text-[#8F210D]">Log In</h2>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          //validationSchema={validationSchema}
          >
            <div>
              <Form>
                <div className="relative">
                  <Field style={{ width: '200px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="username" placeholder="Username" />
                  <ErrorMessage style={{ width: '250px', fontSize: '12px', color: 'red' }} name="username" component="span" />

                  <Field style={{ width: '200px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" type="password" name="password" placeholder="Password" />
                  <ErrorMessage style={{ width: '250px', fontSize: '12px', color: 'red' }} name="password"  component="span" />
                </div>

              


              <div className="relative" >


                <button type="submit" className="p-2 mt-4 bg-[#F97827] rounded-xl text-white py-2 hover:scale-105 duration-300"
                  >
                  Login
                </button>
            
              </div>
              </Form>
            </div>
          </Formik>
          <p className="mt-3 taxt-xs border-b border-grey-400 py-4"></p>
          <div className="mt-2 text-xs flex justify-between items-center">
            <p className="mt-2">Don't have an account?</p>
            <button
              className="mb-2 py-2 px-3 text-sm bg-white border rounded-xl
            hover:scale-110 duration-300 "
            >
              <Link className="no-underline" to="/login/register">
                Register
              </Link>
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl h-96 object-cover object-center"
            src={Airhostess}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
