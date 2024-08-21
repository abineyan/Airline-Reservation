const express = require('express');
const router = express.Router();
const { createPool } = require("mysql2");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json);
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken")
const { validateToken } = require("../middlewares/AuthMiddleware")

var pool = createPool({

    host: "localhost",
    user: "root",
    password: "abi@1234",
    database: "airline_reservation_project"

})


router.post("/login", async (req, res) => {

    const { username, password } = req.body;



    pool.query("select ManagerId from management_crew where ManagerId = (?) and Password = (?)", [username, password], function (err, result, fields) {
        console.log(result)
        if (result.length === 0) {
            res.json({ error: "Incorrect credentials. Check your ID and password!" });
        } else {
            const accessToken = sign({ username: result[0].ManagerId }, "password");
            res.json(accessToken);
        }
    })
})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});

router.post("/addflight", async (req, res) => {

    const { route,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        status,
        aircraftId,
        economyPrice,
        businessPrice,
        platinumPrice,
    } = req.body;

    pool.query("CALL flights_schedule_data_entry(?,?,?,?,?,?,?,?,?,?)", [
        aircraftId,
        route,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        status,
        economyPrice,
        businessPrice,
        platinumPrice,
    ], function (err, result, fields) {

        if (err) {
            console.log(err);
        }

        res.send(result)
    })


})

router.post("/addaircraft", async (req, res) => {

    const {
        aircraftModel,
        economySeatCount,
        bussinessSeatCount,
        platinumSeatCount,
    } = req.body;

    pool.query("CALL aircraft_models_data_entry(?,?,?,?)", [
        aircraftModel,
        economySeatCount,
        bussinessSeatCount,
        platinumSeatCount,
    ], function (err, result, fields) {

        if (err) {
            console.log(err);
        }

        res.send(result)
    })
})

router.post("/addroute", async (req, res) => {

    const {
        DepartureAirportIATACode,
        ArrivalAirportIATACode,
        DistanceInMiles,
    } = req.body;

    pool.query("CALL routes_data_entry(?,?,?)", [
        DepartureAirportIATACode,
        ArrivalAirportIATACode,
        DistanceInMiles,
    ], function (err, result, fields) {

        if (err) {
            console.log(err);
        }

        res.send(result)
    })
})

router.post("/addairport", async (req, res) => {

    const {
        IATACode,
        Name,
        Country,
        State,
        City,
    } = req.body;

    pool.query("CALL airports_data_entry(?,?,?,?,?)", [
        IATACode,
        Name,
        Country,
        State,
        City,
    ], function (err, result, fields) {

        if (err) {
            console.log(err);
        }

        res.send(result)
    })

})

router.post("/reports/passengersfordestination", async (req, res) => {

    const  {

    } = req.body
    pool.query("CALL get_passengers_for_given_destination(?,?,?)", [destination, fromDate, toDate], function(err, result, fields) {
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
           }
        })
})

router.post("/reports/passengersondaterange", async (req, res) => {
        
    const  {

    } = req.body
    pool.query("CALL get_passengers_for_given_passengerType(?,?)", [fromDate, toDate], function(err, result, fields) {
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
 })

router.post("/reports/passengersonflight", async (req, res) => {
        
    const  {

    } = req.body
    pool.query("CALL get_passengers_from_flight_id(?)", [flightId], function(err, result, fields) {
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
 })

router.post("/reports/pastflights", async (req, res) => {
        
    const  {

    } = req.body
    pool.query("CALL get_past_flight_from_given_origin_and_destinations(?,?)", [origin, destination], function(err, result, fields) {
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
 })

router.post("/reports/revenue", async (req, res) => {
        
    const  {

    } = req.body
    pool.query("CALL get_revenue_by_aircraft_type()", [], function(err, result, fields) {
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
 })

module.exports = router;