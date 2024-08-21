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

router.post('/', async (req, res) => {
    // console.log("in get")
    const { DepartureCity, ArrivalCity, ArrivalDate, DepartureDate } = req.body
    console.log(DepartureCity)

    pool.query(
        "select fs.FlightId, fs.DepartureDate, fs.DepartureTime, a.Name as DepartureAirport, a.city as DepartureCity, fs.ArrivalDate, fs.ArrivalTime, b.Name as ArrivalAirport, b.city as ArrivalCity from flights_schedule as fs JOIN routes as r ON fs.RouteId = r.RouteId JOIN airports a ON r.DepartureAirportIATACode = a.IATACode JOIN airports b ON r.ArrivalAirportIATACode = b.IATACode where a.city = (?) and b.city = (?) and fs.DepartureDate between (?) and (?)",
        [DepartureCity, ArrivalCity, ArrivalDate, DepartureDate], function (err, result, fields) {
            if (err) {
                return console.log(err);
            }
            else {
                res.json(result)
            }
        })
})

router.get('/seats/:id', async (req, res) => {

    const id = req.params.id

    pool.query("select  p.Price, CAST(EconomyClassSeatCount / 10  AS SIGNED) AS EconomyRows, CAST(BussinessClassSeatCount / 10  AS SIGNED) AS BusinessRows, CAST(PlatinumClassSeatCount / 10  AS SIGNED) AS PlatinumRows from flights_schedule as fs join aircrafts as a on fs.AircraftId = a.AircraftId join aircraft_models as am on a.AircraftModelId = am.AircraftModelId join price_table as p on fs.FlightId = p.FlightId where fs.flightId = (?)", [id], function (err, result, fields) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result)
            res.send(result)
        }
    })

})

router.post('/seats/booked/:id', async (req, res) => {

    const id = req.params.id;
    const { i, j, selectedClass } = req.body;
    if (selectedClass === "Gold") {
        // console.log(id, i + 1, j + 1, "Business");
        pool.query("select t.FlightId, s.ClassTypeId, s.RowNo, s.ColumnNo from tickets as t join seats as s on t.SeatID = s.SeatId join traveler_classes as tc on tc.ClassTypeId = s.ClassTypeId where t.FlightId = (?)  and tc.ClassType = (?) and s.RowNo = (?) and s.ColumnNo = (?)", [id, "Bussiness", i+1, j+1], function (err, result, fields) {
            console.log(result)
            
            if (err) {
                console.log(err);
            }
            else {
                if (result.length === 0){
                    console.log(result)
                    console.log("not booked")
                    res.send(false);
                }
                else {
                    console.log("booked")
                    res.send(true)
                }
                
            }
        })
    }

    else {
        // console.log(id, i + 1, j + 1, selectedClass);
        pool.query("select t.FlightId, s.ClassTypeId, s.RowNo, s.ColumnNo from tickets as t join seats as s on t.SeatID = s.SeatId join traveler_classes as tc on tc.ClassTypeId = s.ClassTypeId where t.FlightId = (?)  and tc.ClassType = (?) and s.RowNo = (?) and s.ColumnNo = (?)", [id, selectedClass, i+1, j+1], function (err, result, fields) {
            console.log(result)
            if (err) {
                console.log(err);
            }
            else {
                if (result.length === 0){
                    console.log("not booked")
                    res.send(false);
                }
                else {
                    res.send(true)
                    console.log("booked")
                }
                
            }
        })
    }

})

module.exports = router;