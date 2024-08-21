const express = require('express');
const router = express.Router();
const { createPool } = require("mysql2");
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json);
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/AuthMiddleware")

var pool = createPool({

    host: "localhost",
    user: "root",
    password: "abi@1234",
    database: "airline_reservation_project"

})

router.post("/", async (req, res) => {

    const { username,
        nic,
        firstname,
        lastname,
        email,
        phonenumber,
        birthday,
        password,
        address,
        country,
        city
    } = req.body;

    bcrypt.hash(password, 10).then((hashedPassword) => {
        
        pool.query("CALL registered_passenger_data_entry(?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            username,
            "qwert",
            nic,
            firstname,
            lastname,
            email,
            phonenumber,
            birthday,
            hashedPassword,
            address,
            country,
            city,
            "male"

        ], function (err, result, fields) {
            if (err) {
                return console.log(err);
            }
            res.send(result)
          })
    })
})

router.post("/login", async (req, res) => {
    
    const {username, password} = req.body;


    pool.query("select * from registered_passengers where username = (?)", [username],  function(err, result, fields) {
        if (result.length === 0) {
            res.json({ error: "User doesn't exist" });
        } else {
            console.log(password, result[0].Password);
            bcrypt.compare(password, result[0].Password).then((match) => {
                if(err){
                    console.log(err);
                } else if (!match) {
                    res.json({error: "Wrong password. Try again"});
                } else {
                    const accessToken = sign({username: result[0].username}, "password");
                    res.json(accessToken);
                }
            })
        }
    })
})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});


module.exports = router;