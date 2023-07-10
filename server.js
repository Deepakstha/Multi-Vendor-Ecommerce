const app = require("./app")
const connectDatabase = require("./db/database")
require("dotenv").config()



// handeling uncaught Exception error

process.on("uncaughtException", (err)=>{
    console.log("Error",err.message)
    console.log("Shutting Down the Server for handeling uncaught Exception ")
})



console.log(process.env.PORT)
const server = app.listen(
    process.env.PORT,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    }

)

connectDatabase()

process.on("unhandledRejection",(error)=>{
    console.log("Shutting Down the server for ",error.message )
    console.log("Shutting down the server for unhandled promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})