const mongoos = require("mongoose")
require("dotenv").config()

const connectDatabase = () => {
    mongoos.connect(process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((data)=>{
            console.log(`Mongod connected with server ${data.connection.host}`)
        })
}

module.exports = connectDatabase