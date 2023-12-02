const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const bodyparser = require('body-parser');
const Cloudinary = require('cloudinary');

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(cookieParser());

//Cloudinary




//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);


//Middleware
app.use(errorMiddleware);

module.exports = app