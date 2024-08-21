import React from "react";
import "./AddAirport.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAirport = () => {
  const navigate = useNavigate();

  const initialValues = {
    IATACode: "",
    Name: "",
    Country: "",
    State: "",
    City: "",
  };

  const validationSchema = Yup.object().shape({
    IATACode: Yup.string().required("Required"),
    Name: Yup.string().required("Required"),
    Country: Yup.string().required("Required"),
    State: Yup.string().required("Required"),
    City: Yup.string().required("Required"),
  });

  const onSubmit = (data) => {
    console.log("on click");
    axios
      .post("http://localhost:3001/admin/addairport", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          navigate("/admin");
        }
      })

      .catch((error) => {
        console.error("Error in post request:", error);
      });
  };

  return (
    <section className="AddAirport bg-gray-100">
      <div className="flex rounded-2xl shadow-lg max-w-6xl p-3 items-center">
        <div className="w-full flex-col mt-1">
          <div className="w-full flex justify-center items-center">
            <h2 className="font-bold text-4xl text-[#8F210D]">Add Airport</h2>
          </div>

          <div className="md:w-full flex px-10 ">
            <div className="md:w-full px-10">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col gap-1">
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="IATACode"
                      placeholder="IATACode"
                      required="required"
                    />
                    {errors.IATACode && touched.IATACode ? (
                      <div className="text-red-500">{errors.IATACode}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="Name"
                      placeholder="Name"
                      required="required"
                    />
                    {errors.Name && touched.Name ? (
                      <div className="text-red-500">{errors.Name}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="Country"
                      placeholder="Country"
                      required="required"
                    />
                    {errors.Country && touched.Country ? (
                      <div className="text-red-500">{errors.Country}</div>
                    ) : null}

                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="State"
                      placeholder="State"
                      required="required"
                    />
                    {errors.State && touched.State ? (
                      <div className="text-red-500">{errors.State}</div>
                    ) : null}

                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="City"
                      placeholder="City"
                      required="required"
                    />
                    {errors.City && touched.City ? (
                      <div className="text-red-500">{errors.City}</div>
                    ) : null}

                    <button
                      className="pt-2 pb-2 pl-4 pr-4 mt-4 bg-[#F97827] rounded-xl text-white py-2
                                    hover:scale-105 duration-300 "
                      type="submit"
                    >
                      Add Airport
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAirport;