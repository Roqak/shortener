const express = require('express')
const home = require("./routes/index")
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.ss,{ useNewUrlParser: true })
.then((result)=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err)
})


app.use('/',home)


app.listen(process.env.PORT,()=>{
    console.log("listening on port "+ process.env.PORT)
})