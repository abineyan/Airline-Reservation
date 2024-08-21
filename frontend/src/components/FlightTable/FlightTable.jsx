import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


function FlightTable() {

    const location = useLocation();
    const data = location.state.data;
    console.log("at flightable", data)

    const navigate = useNavigate();
    
    

    return (
        <div className="mt-40 max-w-screen-md mx-auto overflow-x-auto">

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        
                        <th scope="col" className="px-6 py-3">
                            Take off Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Take off Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Arrival Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Arrival Time
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((flight) => (
                        
                    


                        <tr
                            key={uuidv4()}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
             
                            <td className="px-6 py-4">{flight.DepartureDate}</td>
                            <td className="px-6 py-4">{flight.DepartureTime}</td>
                            <td className="px-6 py-4">{flight.ArrivalDate}</td>
                            <td className="px-6 py-4">{flight.ArrivalTime}</td>
                            <td scope="col" className="px-6 py-3">
                                <button onClick={() => {navigate(`/flightschedule/${flight.FlightId}`)}} className="text-gray-900" style={{ color: '#0d6efd', padding: "0.6rem 1.4rem", background: "#f97827", border: "none", borderRadius: "15px"}}>
                                Book</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightTable;
