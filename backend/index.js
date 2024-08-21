const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());



const usersRouter = require('./routes/Users');
const bookingRouter = require('./routes/Booking');
const adminRouter = require('./routes/Admin')

app.use("/auth", usersRouter);
app.use("/booking", bookingRouter);
app.use("/admin",adminRouter);



app.listen(3001, () => {
    console.log("Server running on port 3001");
});

