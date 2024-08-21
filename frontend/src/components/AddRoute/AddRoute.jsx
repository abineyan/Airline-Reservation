import React from "react";
import "./AddRoute.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAirport = () => {
  const navigate = useNavigate();
  const initialValues = {
    RouteId: "",
    DepartureAirportIATACode: "",
    ArrivalAirportIATACode: "",
    DistanceInMiles: "",
  };

  const validationSchema = Yup.object().shape({
    RouteId: Yup.string().required("Required"),
    DepartureAirportIATACode: Yup.string().required("Required"),
    ArrivalAirportIATACode: Yup.string().required("Required"),
    DistanceInMiles: Yup.number()
      .required("Required")
      .positive()
      .integer()
      .min(0),
  });

  const onSubmit = (data) => {
    console.log("on click");
    axios
      .post("http://localhost:3001/admin/addroute", data)
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
    <section className="AddRoute bg-gray-100">
      <div className="flex rounded-2xl shadow-lg max-w-6xl p-3 items-center">
        <div className="w-full flex-col mt-1">
          <div className="w-full flex justify-center items-center">
            <h2 className="font-bold text-4xl text-[#8F210D]">Add Route</h2>
          </div>

          <div className="md:w-full flex px-10 mx-0 ">
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
                      name="RouteId"
                      placeholder="RouteId"
                      required="required"
                    />
                    {errors.RouteId && touched.RouteId ? (
                      <div className="text-red-500">{errors.RouteId}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="DepartureAirportIATACode"
                      placeholder="DepartureAirportIATACode"
                      required="required"
                    />
                    {errors.DepartureAirportIATACode &&
                    touched.DepartureAirportIATACode ? (
                      <div className="text-red-500">
                        {errors.DepartureAirportIATACode}
                      </div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="ArrivalAirportIATACode"
                      placeholder="ArrivalAirportIATACode"
                      required="required"
                    />
                    {errors.ArrivalAirportIATACode &&
                    touched.ArrivalAirportIATACode ? (
                      <div className="text-red-500">
                        {errors.ArrivalAirportIATACode}
                      </div>
                    ) : null}

                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="DistanceInMiles"
                      placeholder="DistanceInMiles"
                      step="1"
                      min="0"
                      required="required"
                    />
                    {errors.DistanceInMiles && touched.DistanceInMiles ? (
                      <div className="text-red-500">
                        {errors.DistanceInMiles}
                      </div>
                    ) : null}
                    <button
                      className="pt-2 pb-2 pl-4 pr-4 mt-4 bg-[#F97827] rounded-xl text-white py-2
                                    hover:scale-105 duration-300 "
                      type="submit"
                    >
                      Add Route
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