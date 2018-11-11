const express = require('express');

const app = express();
const mysql = require('mysql');
const morgan = require('morgan');

app.use(morgan('combined'));


// Service for returning specific user
//app.get("/user/:id/:name",(req,res)=>{
   





const routerUser = require('./Routes/user.js');

app.use(routerUser);


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is up and listening on:"+PORT)
})