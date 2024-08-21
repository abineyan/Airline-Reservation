import React from "react";
import "./Companies.css";
import image1 from "../../images/prologis.png";
import image2 from "../../images/equinix.png";
import image3 from "../../images/tower.png";

const Companies = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerwidth flexCenter c-container">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
      </div>
    </section>
  );
};

export default Companies;
