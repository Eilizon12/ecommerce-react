const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const error = require("./middleware/error");


//Handling Uncaught

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Server due Uncaught Exception`);
    process.exit(1);
});


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
    console.log(`Shutting Down the Server `)

    server.close(()=>{
        process.exit(1);
    });
})
