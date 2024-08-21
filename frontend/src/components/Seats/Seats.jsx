import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


function SeatCollection(props) {
  const { rows, columns, id, selectedClass } = props;

  const seats = [];


  const [bookingData, setBookingData] = useState({});

  console.log("bookingData",bookingData,rows, columns,selectedClass, "Platinum")

  useEffect(() => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        axios.post(`http://localhost:3001/booking/seats/booked/${id}`, { i, j, selectedClass })
          .then((response) => {

            console.log(i + 1, j + 1, response.data);
            setBookingData((bd) => ({ ...bd, [`${i + 1},${j + 1}`]: response.data }))

          })
      }
    }
  }, [])

  var count = 1;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      var seatNumber = count++;

      let className = ''
      if (!!bookingData[`${i + 1},${j + 1}`]) {
        className =
          "w-1/10 px-3 py-3 bg-red-400 rounded-2xl mr-2.5 my-1";
      } else {
        className =
          "w-1/10 px-3 py-3 bg-gray-400 hover:bg-gray-500 rounded-2xl ml-2.5 my-1";
      }

      row.push(
        <button
          key={`seat-${i}-${j}`}
          className={className}
          style={{ width: "50px", height: "50px" }}
        >
          <h5 className="text-sm text-center">
            {String(seatNumber).padStart(2, "0")}
          </h5>
        </button>
      );
    }
    seats.push(
      <div key={`row-${i}`} className="w-full flex">
        {row}
      </div>
    );
  }

  return <>{seats}</>;
}


function Seats(props) {


  let { id } = useParams();

  const [selectedClass, setSelectedClass] = useState(null);
  const [econrows, setEconrows] = useState("");
  const [goldrows, setGoldrows] = useState("");
  const [platrows, setPlatrows] = useState("");
  const [booked, setBooked] = useState("")

  const [object, setObject] = useState([]);
  console.log("Rending")
  useEffect(() => {

    axios.get(`http://localhost:3001/booking/seats/${id}`).then((response) => {

      console.log(response.data)
      // console.log("dhhhL ", response.data[0].Price)
      setObject(response.data)
      // console.log(object)

    });

  }, [])


  const handleClassSelection = (seatClass) => {
    setSelectedClass(seatClass);
  };

  const econRows = object[0]?.EconomyRows;
  const goldRows = object[1]?.BusinessRows;
  const platRows = object[2]?.PlatinumRows;
  const platPrice = object[2]?.Price;
  const goldPrice = object[1]?.Price;
  const econPrice = object[0]?.Price;


  const renderSeatNumbers = () => {

    const seatRows = {

      Platinum: { rows: platRows, columns: 10 },
      Gold: { rows: goldRows, columns: 10 },
      Economy: { rows: econRows, columns: 10 },
    };

      const { rows, columns } = seatRows[selectedClass || 'Platinum'];
      return (
        <div className="flex-col w-2/3 m-4 rounded-2xl justify-center items-center">
          <SeatCollection rows={rows} columns={columns} id={id} selectedClass={selectedClass}/>
        </div>
      );
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-10">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg items-center">
        <div className="flex-col w-1/3">
          <div className="w-full my-4 py-0">
            <h5 className="text-center px-12 text-lg">AirCraft Model</h5>
            <h6></h6>
          </div>

          <div className="w-full px-5 py-3">
            <div
              className={`w-full px- py-1 ${selectedClass === "Platinum"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600"
                } rounded-2xl `}
              onClick={() => handleClassSelection("Platinum")}
            >
              <h4 className="text-lg">Platinum Class</h4>
              <h4 className="text-sm">{`Price: $${platPrice}`}</h4>
            </div>
            <div
              className={`w-full px-0 py-1 ${selectedClass === "Gold"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600 my-5"
                } my-5 rounded-2xl`}
              onClick={() => handleClassSelection("Gold")}
            >
              <h4 className="text-lg">Gold Class</h4>
              <h4 className="text-sm">{`Price: $${goldPrice}`}</h4>
            </div>
            <div
              className={`w-full px-0 py-1 ${selectedClass === "Economy"
                ? "bg-cyan-600"
                : "bg-cyan-500 hover:bg-cyan-600"
                } rounded-2xl`}
              onClick={() => handleClassSelection("Economy")}
            >
              <h4 className="text-lg">Economy Class</h4>
              <h4 className="text-sm">{`Price: $${econPrice}`}</h4>
            </div>
          </div>

          <div className="flex justify-center px-5 mb-2 py-6">
            <button
              type="submit"
              className="px-12 bg-[#F97827] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              <Link className="no-underline" to="/">
                Proceed{" "}
              </Link>
            </button>
          </div>
        </div>
        {renderSeatNumbers()}
      </div>
    </section>
  )
}


export default Seats;
