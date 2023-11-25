const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { connect } = require("mongoose");

//Config
dotenv.config({
    path:"./config/config.env"
});

//Database

connectDatabase();


const server = app.listen(process.env.PORT, ()=>{

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server`);
    

    server.close(()=>{
        process.exit(1);
    });
});