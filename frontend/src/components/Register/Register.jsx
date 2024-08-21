import React from "react";
import airplaneImage from "../../images/planegirl2.png";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
  
  const navigate = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    birthday: "",
    address: "",
    city: "",
    country: "",
    phonenumber: "",
    email: "",
    nic: "",
    username: "",
    password: "",
    confirmpassword: ""
  };

  const validationSchema = Yup.object().shape({

    firstname: Yup.string().required("You must input a firstname"),
    lastname: Yup.string().required("You must input a lastname"),
    birthday: Yup.string().required("You must input a birthday"),
    address: Yup.string().required("You must input an address"),
    city: Yup.string().required("You must input a city"),
    country: Yup.string().required("You must input a country"),
    phonenumber: Yup.string().required("You must input a phone number"),
    email: Yup.string().required("You must input a email"),
    nic: Yup.string().required("You must input a NIC"),
    username: Yup.string().required("You must input a username"),
    password: Yup.string().required("You must input a password"),
    confirmpassword: Yup.string().required("You must confirm your password"),

  })

  const onSubmit = (data) => {
    console.log("On submit")
    if (data.password === data.confirmpassword) {
      axios.post("http://localhost:3001/auth", data)
        .then((response) => {

          navigate("/login");
        })
        .catch((error) => {
          console.error("Error in post request:", error);
        });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-10">
      <div
        className="bg-gray-100 flex rounded-2xl 
      shadow-lg max-w-6xl p-3 items-center"
      >
        {/* Image */}
        <div className="md:block hidden w-2/5">
          <img className="rounded-2xl" src={airplaneImage} alt="" />
        </div>

        {/* Register Container */}
        <div className="w-full flex-col">
          <h2 className="font-bold text-4xl text-[#8F210D]">Register</h2>

          {/*Username Password*/}

          <div className="md:w-full pl-20">

            <Formik initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>

            </Formik>
          </div>

          {/*Input personal data*/}
          <div className="md:w-full flex justify-center">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >

              <div>
                <div className="flex">

                  <div className="relative flex-1">
                    <Form>
                      <Field style={{ width: '250px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="username" placeholder="Username" />
                      <ErrorMessage style={{ width: '250px', fontSize: '12px', color: 'red' }} name="username" component="span" />

                    </Form>
                  </div>
                  <div className="relative flex-1">
                    <Form>
                      <Field style={{ width: '250px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="password" type="password" placeholder="Password" />
                      <ErrorMessage style={{ width: '250px', fontSize: '12px', color: 'red' }} type="password" name="password" component="span" />

        
                    </Form>
                  </div>
                  <div className="relative flex-1">

                    <Form>
                      <Field style={{ width: '250px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="confirmpassword" type="password" placeholder="Confirm password" />
                      <ErrorMessage style={{ width: '250px', fontSize: '12px', color: 'red' }} type="password" name="confirmpassword" component="span" />
                    </Form>
                  </div>

                </div>
                <div className="flex">
                  <div className="md:w-1/2 px-10">
                    <Form className="flex flex-col gap-1">

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="firstname" placeholder="Firstname" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="firstname" component="span" />

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="lastname" placeholder="Lastname" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="lastname" component="span" />

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="birthday" placeholder="Birthday" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="birthday" component="span" />

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="address" placeholder="Address" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="address" component="span" />
                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="country" placeholder="Country" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="country" component="span" />

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="city" placeholder="City" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="city" component="span" />

                    </Form>
                  </div>
                  <div className="md:w-1/2 px-10">
                    <Form className="flex flex-col gap-1">

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="email" placeholder="Email" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="email" component="span" />

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="phonenumber" placeholder="Phonenumber" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="phonenumber" component="span" />

                      <Field style={{ width: '280px' }} className="p-2 mt-4 rounded-xl border" autoComplete="off" id="inputUsername" name="nic" placeholder="NIC" />
                      <ErrorMessage style={{ width: '280px', fontSize: '12px', color: 'red' }} name="nic" component="span" />

                      <button
                        type="submit"
                        className="p-2 mt-5 bg-[#F97827] rounded-xl text-white py-2 hover:scale-105 duration-300">
                        Register
                      </button>
                    </Form>

                    <div>
                      <p className="mt-3 taxt-xs border-b border-grey-400 py-0"></p>
                      <div className="mt-2 text-xs flex justify-between items-center">
                        <p className="mt-2">Already have an account?</p>
                        <button
                          className="mb-1 py-2 px-4 text-sm bg-white border rounded-xl
            hover:scale-110 duration-300 "
                        >
                          <Link className="no-underline" to="/register/login">
                            Login{" "}
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Register;
