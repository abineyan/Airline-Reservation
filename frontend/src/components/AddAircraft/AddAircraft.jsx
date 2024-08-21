import React from "react";
import "./AddAircraft.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAircraft = () => {
  const navigate = useNavigate();

  const initialValues = {
    aircraftId: "",
    aircraftModel: "",
    economySeatCount: "",
    bussinessSeatCount: "",
    platinumSeatCount: "",
  };

  const validationSchema = Yup.object().shape({
    aircraftId: Yup.string().required("Required"),
    aircraftModel: Yup.string().required("Required"),
    economySeatCount: Yup.number()
      .required("Required")
      .positive()
      .integer()
      .min(0),
    bussinessSeatCount: Yup.number()
      .required("Required")
      .positive()
      .integer()
      .min(0),
    platinumSeatCount: Yup.number()
      .required("Required")
      .positive()
      .integer()
      .min(0),
  });

  const onSubmit = (data) => {
    console.log("on click");
    axios
      .post("http://localhost:3001/admin/addaircraft", data)
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
    <section className="AddAircraft">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-3 items-center">
        <div className="w-full flex-col mt-1">
          <div className="w-full flex justify-center items-center">
            <h2 className="font-bold text-4xl text-[#8F210D]">Add Aircraft</h2>
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
                      name="aircraftId"
                      placeholder="Aircraft Id"
                      required="required"
                    />
                    {errors.aircraftId && touched.aircraftId ? (
                      <div className="text-red-500">{errors.aircraftId}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="text"
                      name="aircraftModel"
                      placeholder="Aircraft Model"
                      required="required"
                    />
                    {errors.aircraftModel && touched.aircraftModel ? (
                      <div className="text-red-500">{errors.aircraftModel}</div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="economySeatCount"
                      placeholder="EcononySeatCount"
                      step="1"
                      min="0"
                      required="required"
                    />
                    {errors.economySeatCount && touched.economySeatCount ? (
                      <div className="text-red-500">
                        {errors.economySeatCount}
                      </div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="bussinessSeatCount"
                      placeholder="BussinessSeatCount"
                      step="1"
                      min="0"
                      required="required"
                    />
                    {errors.bussinessSeatCount && touched.bussinessSeatCount ? (
                      <div className="text-red-500">
                        {errors.bussinessSeatCount}
                      </div>
                    ) : null}
                    <Field
                      className="p-2 mt-4 rounded-xl border"
                      type="number"
                      name="platinumSeatCount"
                      placeholder="PlatinumSeatCount"
                      step="1"
                      min="0"
                      required="required"
                    />
                    {errors.platinumSeatCount && touched.platinumSeatCount ? (
                      <div className="text-red-500">
                        {errors.platinumSeatCount}
                      </div>
                    ) : null}
                    <button
                      className="pt-2 pb-2 pl-4 pr-4 mt-2 bg-[#F97827] rounded-xl text-white py-2
                                    hover:scale-105 duration-300 "
                      type="submit"
                    >
                      Add Flight
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

export default AddAircraft;
