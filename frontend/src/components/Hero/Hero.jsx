import React from "react";
import CountUp from "react-countup";
import "./Hero.css";
import image from "../../images/gentlemen.png";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings gap-12 innerWidth flexCenter justify-between items-end mt-0 pt-3">
        {/* Left section */}
        <div className="flexColStart gap-12 justify-center align-center  pt-5  mt-8 ">
          <div className="relative z-1 align-center w-full mt-7">
            <div className="orange-circle"></div>
            <h1 className="text-left w-full font-extrabold leading-normal text-5xl">
              Let your fingers do
              <br />
              the booking
            </h1>
          </div>
          <div className="flexColStart hero-des p-1 align-between space-y-3 font-normal justify-around ml-5 w-full">
            <span className="secondaryText text-xs ">
              Embark on a Journey Beyond Boundaries.
            </span>
            <span className="secondaryText">
              Explore, Dream, Discover with B Airlines.
            </span>
          </div>

          <div className="stats flex justify-around w-full">
            <div className="flexColCenter stat ">
              <span className="text-4xl">
                <CountUp start={1900} end={2000} duration={3} />
              </span>
              <span className="text-4xl  text-red-500/75">+</span>
              <span className="secondaryText">Flights</span>
            </div>
            <div className="flexColCenter stat">
              <span className="text-4xl">
                <CountUp start={95000} end={100000} duration={3} />
              </span>
              <span className="text-4xl text-red-500/75">+</span>
              <span className="secondaryText">Happy Passengers</span>
            </div>
            <div className="flexColCenter stat">
              <span className="text-4xl">
                <CountUp start={15} end={20} duration={3} />
              </span>
              <span className="text-4xl  text-red-500/75">+</span>
              <span className="secondaryText">Award Winings</span>
            </div>
          </div>
        </div>
        {/* Right section */}
        <div className="flexCenter hero-right mt-14 ml-0 pt-6">
          <div className="image-container">
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;