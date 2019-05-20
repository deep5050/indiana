const express= require('express');
const app = express();
const log = require('signale');
var pincode = require('./routes/pincode');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});
const db = mongoose.connection;

db.on('error',(err)=>{
    log.error(err);
})
db.once('open',()=>{
    log.star("connected to database");
})

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("in the root");
})

app.use('/pincode',pincode);








app.all("*",(req,res)=>{
    log.error("Invalid URL");
    res.status(400).json({message:"Invalid URL"});
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
log.watch(`server running on ${PORT}`);
});