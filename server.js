require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const dbconfig = require("./db")
const roomRoute = require("./routes/roomRoutes.js")
const userRoute = require("./routes/usersRoutes.js")
const cors = require("cors")
app.use(cors())


app.use(express.json())
app.use("/api/rooms",roomRoute)
app.use("/api/users",userRoute)
app.listen(port,()=>{
    console.log(`Server listening port no. is ${port} `);
})