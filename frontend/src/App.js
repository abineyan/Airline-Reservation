import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import Companies from "./components/Companies/Companies";
import Card from "./components/Card/Card";
import Carousel from "./components/Carousel/Carousel";
import Banner from "./components/Banner/Banner";
import Guest from "./components/Guest/Guest";
import Booking from "./components/SearchFlight/SearchFlight";


import FlightTable from "./components/FlightTable/FlightTable";
import SearchFlight from "./components/SearchFlight/SearchFlight";
import Seats from "./components/Seats/Seats";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Dashboard from "./components/Dashboard/Dashboard";
import AddAircraft from "./components/AddAircraft/AddAircraft";
import AddFlight from "./components/AddFlight/AddFlight";
import AddRoute from "./components/AddRoute/AddRoute"
import AddAirport from "./components/AddAirport/AddAirport";

import "./App.css";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    status: false,
    admin: false
  });


  useEffect(() => {
    console.log("in use effect");
    // can fake access token be made
    // if (localStorage.getItem("accessToken")){
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Routes>
          <Route path='/*' element={
            <>
              <Header />
              {/* <Dashboard /> */}

              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Banner />
                      <Card />
                      <Hero />
                      
                    </>
                  }
                />
                <Route path="/card" element={<Card />} />
                <Route path="/ourvalues" element={<Carousel />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login/card" element={<Card />} />
                <Route path="/login/register" element={<Register />} />
                <Route path="/register/login" element={<Login />} />
                <Route path="/book" element={<Booking />} />
                <Route path="/flightschedule" element={<FlightTable />} />
                <Route path="/flightschedule/:id" element={<Seats />} />
                <Route path="/book" element={<SearchFlight />} />
                <Route path="/loginadmin" element={<AdminLogin />} />
                <Route path="/guestbooking/:id" element={<Guest />}></Route>
              
              </Routes>


              <Footer></Footer>
            </>
          } />

          {/* </Routes> */}
          {/* <Header />



            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Banner />
                    <Card />
                    <Hero />
                  </>
                }
              />
              <Route path="/card" element={<Card />} />
              <Route path="/ourvalues" element={<Carousel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login/card" element={<Card />} />
              <Route path="/login/register" element={<Register />} />
              <Route path="/register/login" element={<Login />} />
              <Route path="/book" element={<Booking />} />
              <Route path="/flightschedule" element={<FlightTable />} />
              <Route path="/flightschedule/:id" element={<Seats />} />
              <Route path="/book" element={<SearchFlight />} />
              <Route path="/loginadmin" element={<AdminLogin />} /> */}
          {/* <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/addaircraft" element={<AddAircraft />} />
          <Route path="/admin/addflight" element={<AddFlight />} />
          <Route path="/admin/addroute" element={<AddRoute />} /> */}



          {/* </Routes>
        <Footer></Footer> */}
          {/* 
      <AddAircraft />
      <AddFlight />
      <AddRoute /> */}

          {/* <Seats /> */}



          <Route path="admin/*" element={
            <>
              <div ClassName="bg-white p-4 rounded-lg shadow-md"></div>
              <div className="flex">
                <div className="">
                  <Dashboard></Dashboard>
                </div>
                <div className="w-3/4">
                  <Routes>
                    <Route path="/addaircraft" element={<AddAircraft></AddAircraft>}></Route>
                    <Route path="/" element={<AddFlight></AddFlight>}></Route>
                    <Route path="/addroute" element={<AddRoute></AddRoute>}></Route>
                    <Route path="/addairport" element={<AddAirport />}></Route>
                    {/* <Route path="/passengerdestination" element={</>}>
                    <Route path="/passengerdate" element={</>}></Route>
                    <Route path="/passengerflight" element={</>}></Route>
                    <Route path="/flighthistory" element={</>}></Route>
                    <Route path="/revenue" element={</>}></Route> */}


                    
                  </Routes>
                </div>
              </div>
            </>
          }></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
