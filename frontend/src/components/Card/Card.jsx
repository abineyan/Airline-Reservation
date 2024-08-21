import React from "react";
import image1 from "../../images/Thailand.jpeg";
import image2 from "../../images/Singapore2.jpeg";
import image3 from "../../images/SriLanka.jpeg";
import image4 from "../../images/Dubai.jpeg";

const Card = () => {
  return (
    <div className="bg-gray-100 p-3">
      <h1 className="mt-5">Most Visited Destinations</h1>
      <div class="bg-gray-100 w-full min-h-full pl-5 pr-5 pb-5 pt-3 gap-4 flex-wrap flex justify-center items-center">
        {/*Card 1*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image1} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Thailand</h2>
            <p class="text-sm text-gray-600">
              Let your journey begin amidst the tranquility of ancient temples
              and the allure of tropical beaches.
            </p>
          </div>
          <div class="m-2">
            <a
              role="button"
              href="#"
              class="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-[#f97827]"
            >
              Learn More
            </a>
          </div>
        </div>

        {/*Card 2*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image2} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Singapore</h2>
            <p class="text-sm text-gray-600">
              Explore vibrant streets, savor diverse cuisines, and wander lush
              gardens in the Lion City – where cultures fuse, and memories are
              born.
            </p>
          </div>
          <div class="m-2">
            <a
              role="button"
              href="#"
              class="text-white bg-sky-500 px-3 py-1 rounded-md hover:bg-[#f97827]"
            >
              Learn More
            </a>
          </div>
        </div>

        {/*Card 3*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image3} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Sri Lnaka</h2>
            <p class="text-sm text-gray-600">
              Explore lush greenery, ancient ruins, and golden sunsets in the
              Pearl of the Indian Ocean – your adventure awaits!
            </p>
          </div>
          <div class="m-2">
            <a
              role="button"
              href="#"
              class="text-white bg-green-500 px-3 py-1 rounded-md hover:bg-[#f97827]"
            >
              Learn More
            </a>
          </div>
        </div>

        {/*Card 4*/}
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="w-full object-cover rounded-xl" src={image4} alt=""></img>
          <div class="p-2">
            <h2 class="font-bold text-lg mb-2 ">Dubai</h2>
            <p class="text-sm text-gray-600">
              Where dreams take flight amid futuristic wonders and timeless
              traditions, blending luxury and heritage.
            </p>
          </div>
          <div class="m-2">
            <a
              role="button"
              href="#"
              class="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-[#f97827]"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
