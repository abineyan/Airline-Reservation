import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import FlightTable from "../FlightTable/FlightTable";



const SearchFlight = () => {

    const navigate = useNavigate();

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [searchData, setSearchData] = useState({
        departure: "",
        arrival: "",
        fromDate: "",
        toDate: "",
    });
 

    const handleInputChangeFrom = (e) => {
        setFrom(e.target.value);
    };
    const handleInputChangeArrivalDate = (e) => {
        setFromDate(e.target.value);
    };
    const handleInputChangeDepartureDate = (e) => {
        setToDate(e.target.value);
    };
    const handleInputChangeTo = (e) => {
        setTo(e.target.value);
    };

    const handleSearch = async () => {
        // Make an Axios GET request to the backend API
        const postData = {
            DepartureCity: from,
            ArrivalCity: to,
            DepartureDate: fromDate,
            ArrivalDate: toDate,
        };

        
        console.log("at search flight: ", postData)

        axios.post("http://localhost:3001/booking", postData)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            console.log("at axios:", response.data)
            navigate("/flightschedule", {state : {data: response.data}});
            
          }
        })
        
        
    };
    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center mt-10">
            <div
                className="bg-gray-100 rounded-2xl 
  shadow-lg max-w-6xl p-3 items-center"
            >
                <div className="w-full">
                    <h2 className="font-bold text-4xl text-[#8F210D]">
                        Book Your Flight
                    </h2>
                </div>
                <div className="w-full p-2">
                    <div className="w-full flex p-2 gap-5">
                        <div className="w-1/2 flex">
                            <input
                                type="text"
                                className="p-2 mt-4 rounded-xl border w-full"
                                name="departure"
                                placeholder="Departure"
                                value={from}
                                onChange={handleInputChangeFrom}
                            />
                        </div>
                        <div className="w-1/2 flex">
                            <input
                                type="text"
                                className="p-2 mt-4 rounded-xl border w-full"
                                name="arrival"
                                placeholder="Arrival"
                                value={to}
                                onChange={handleInputChangeTo}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full p-2">
                    <div className="w-full flex p-2 gap-5">
                        <div className="w-1/2 flex">
                            <input
                                className="p-2 mt-2 rounded-xl border w-full"
                                type="date"
                                name="From"
                                placeholder="From"
                                value={toDate}
                                onChange={handleInputChangeDepartureDate}
                            />
                        </div>
                        <div className="w-1/2 flex">
                            <input
                                className="p-2 mt-2 rounded-xl border w-full"
                                type="date"
                                name="To"
                                placeholder="To"
                                value={fromDate}
                                onChange={handleInputChangeArrivalDate}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-2 mr-4">
                    <button
                        type="button"
                        className="px-5 mt-0 bg-[#F97827] rounded-xl text-white py-2 hover:scale-105 duration-300"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
        
        </section>
    );
};

export default SearchFlight;
