const express = require('express')
const home = require("./routes/index")
const app = express();
const mongoose = require('mongoose')
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
require('dotenv').config()
const port = process.env.PORT || 6500
mongoose.connect(process.env.ss,{ useNewUrlParser: true })
.then((result)=>{
    console.log("connected")
})
.catch(err=>{
    console.log(err)
})


app.use('/',home)


app.listen(port,()=>{
    console.log("listening on port "+ port)
})