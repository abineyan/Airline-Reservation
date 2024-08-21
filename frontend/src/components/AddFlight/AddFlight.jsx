import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFlight = () => {
  const navigate = useNavigate();

  const initialValues = {
    route: "",
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
    status: "",
    aircraftId: "",
    economyPrice: "",
    businessPrice: "",
    platinumPrice: "",
  };

  const validationSchema = Yup.object().shape({
    route: Yup.string().required("Required"),
    departureDate: Yup.date().required("Required"),
    arrivalDate: Yup.date().required("Required"),
    departureTime: Yup.string().required("Required"),
    arrivalTime: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    aircraftId: Yup.string().required("Required"),
    economyPrice: Yup.number().required("Required").positive().min(0),
    businessPrice: Yup.number().required("Required").positive().min(0),
    platinumPrice: Yup.number().required("Required").positive().min(0),
  });

  const onSubmit = (data) => {
    console.log("on click");
    axios
      .post("http://localhost:3001/admin/addflight", data)
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
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="bg-gray-100 flex rounded-2xl 
      shadow-lg max-w-4xl p-3 items-center"
      >
        <div className="w-full flex-col mt-1">
          <div className="w-full flex justify-center items-center">
            <h2 className="font-bold text-4xl text-[#8F210D]">Add Flight</h2>
          </div>

          <div className="md:w-full flex px-10 ">
            <div className="md:w-1/2 px-10">
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
                      name="route"
                      placeholder="Route"
                      required="required"
                    />
                    {errors.route && touched.route ? (
                      <div className="text-red-500">{errors.route}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="departureDate"
                      placeholder="Departure Date"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      required="required"
                    />
                    {errors.departureDate && touched.departureDate ? (
                      <div className="text-red-500">{errors.departureDate}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="arrivalDate"
                      placeholder="Arrival Date"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      required="required"
                    />
                    {errors.arrivalDate && touched.arrivalDate ? (
                      <div className="text-red-500">{errors.arrivalDate}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="departureTime"
                      placeholder="Departure Time"
                      onFocus={(e) => (e.target.type = "time")}
                      onBlur={(e) => (e.target.type = "text")}
                      required="required"
                    />
                    {errors.departureTime && touched.departureTime ? (
                      <div className="text-red-500">{errors.departureTime}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="arrivalTime"
                      placeholder="Arrival Time"
                      onFocus={(e) => (e.target.type = "time")}
                      onBlur={(e) => (e.target.type = "text")}
                      required="required"
                    />
                    {errors.arrivalTime && touched.arrivalTime ? (
                      <div className="text-red-500">{errors.arrivalTime}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="status"
                      placeholder="Status"
                      required="required"
                    />
                    {errors.status && touched.status ? (
                      <div className="text-red-500">{errors.status}</div>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="md:w-1/2 px-10">
              <Formik
                initialValues={{
                  aircraftId: "",
                  economyPrice: "",
                  businessPrice: "",
                  platinumPrice: "",
                }}
                validationSchema={Yup.object({
                  aircraftId: Yup.string().required("Required"),
                  economyPrice: Yup.number()
                    .required("Required")
                    .positive("Price must be positive"),
                  businessPrice: Yup.number()
                    .required("Required")
                    .positive("Price must be positive"),
                  platinumPrice: Yup.number()
                    .required("Required")
                    .positive("Price must be positive"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="flex flex-col gap-1">
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="aircraftId"
                      placeholder="Aircraft Id"
                      required="required"
                    />
                    {errors.aircraftId && touched.aircraftId ? (
                      <div className="text-red-500">{errors.aircraftId}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="economyPrice"
                      placeholder="Economy Price"
                      step="0.01"
                      min="0"
                      required="required"
                    />
                    {errors.economyPrice && touched.economyPrice ? (
                      <div className="text-red-500">{errors.economyPrice}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="businessPrice"
                      placeholder="Business Price"
                      step="0.01"
                      min="0"
                      required="required"
                    />
                    {errors.businessPrice && touched.businessPrice ? (
                      <div className="text-red-500">{errors.businessPrice}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="platinumPrice"
                      placeholder="Platinum Price"
                      step="0.01"
                      min="0"
                      required="required"
                    />
                    {errors.platinumPrice && touched.platinumPrice ? (
                      <div className="text-red-500">{errors.platinumPrice}</div>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="flex justify-end items-end mr-20 pb-4">
            <button
              className="pt-2 pb-2 pl-4 pr-4 mt-2 bg-[#F97827] rounded-xl text-white py-2
            hover:scale-105 duration-300 "
            >
              Add Flight
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddFlight;
