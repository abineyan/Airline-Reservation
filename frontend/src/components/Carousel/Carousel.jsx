import React from "react";
import image1 from "../../images/Baggage.jpg";
import image2 from "../../images/DutyFree.jpg";
import image3 from "../../images/Seat.png";
import image4 from "../../images/SpecialMoments.jpeg";

const Carousel = () => {
  return (
    <div className="bg-gray-100 p-3 mt-20">
      <h1 className="mt-5">Value Added Services</h1>
      <div class="w-full min-h-full pl-5 pr-5 pb-5 pt-3 gap-4 flex-wrap flex justify-center items-center">
        {/*Card 1*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image1} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Prepaid Excess Baggage</h2>
            <p class="text-sm text-gray-600">
              Pre-purchase extra baggage at a discounted rate
            </p>
          </div>
        </div>

        {/*Card 2*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image2} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Pre-Order Your Duty-Free</h2>
            <p class="text-sm text-gray-600">
              You can easily pre-order your favorite duty-free item
            </p>
          </div>
        </div>

        {/*Card 3*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image3} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Advance Seat Reservation</h2>
            <p class="text-sm text-gray-600">
              Pre-book an extra legroom seat in Economy Class
            </p>
          </div>
        </div>

        {/*Card 4*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image4} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Special Moments Onboard</h2>
            <p class="text-sm text-gray-600">
              Celebrate your memorable moments on board with us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
