import React from "react";
import airplaneImage from "../../images/planegirl2.png";

function Guest() {
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div
        className="bg-gray-100 flex rounded-2xl 
      shadow-lg max-w-6xl p-3 items-center"
      >
        {/* Image */}
        <div className="md:block hidden w-1/4">
          <img className="rounded-2xl" src={airplaneImage} alt="" />
        </div>

        {/* Register Container */}
        <div className="w-3/4 flex-col mt-1">
          <h2 className="font-bold text-4xl pl-20 text-[#8F210D]">
            Login As a Guest
          </h2>

          {/*Input personal data*/}
          <div className="md:w-full flex px-10 ">
            <div className="md:w-1/2 px-10">
              <form action="" className="flex flex-col gap-1">
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="text"
                  name="First Name"
                  placeholder="First Name"
                  required="required"
                />
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="text"
                  name="Last Name"
                  placeholder="Last Name"
                  required="required"
                />
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="text"
                  name="Birthday"
                  placeholder="Birthday"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  required="required"
                />
              </form>
            </div>
            <div className="md:w-1/2 px-10">
              <form action="" className="flex flex-col gap-1">
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="email"
                  name="Email"
                  placeholder="Email"
                  required="required"
                />
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="text"
                  name="Phone Number"
                  placeholder="Phone Number"
                  required="required"
                />
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="text"
                  name="Passport Number"
                  placeholder="Passport Number"
                  required="required"
                />
                <input
                  className="p-2 mt-4 rounded-xl border"
                  type="text"
                  name="NIC"
                  placeholder="NIC"
                  required="required"
                />
                <button
                  className="p-2 mt-5 bg-[#F97827] rounded-xl text-white py-2
            hover:scale-105 duration-300"
                >
                  Register
                </button>
              </form>
              <div>
                <p className="mt-3 taxt-xs border-b border-grey-400 py-0"></p>
                <div className="mt-2 text-xs flex justify-between items-center">
                  <p className="mt-2">Already have an account?</p>
                  <button
                    className="mb-1 py-2 px-4 text-sm bg-white border rounded-xl
            hover:scale-110 duration-300 "
                  >
                    LogIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Guest;
