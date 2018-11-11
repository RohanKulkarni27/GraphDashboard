const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//Service for fetching Year

router.get("/",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b1432c153d4d1a',
        password:'f7493b11',
        database:'heroku_c1b66aa00f54d7b'
    })
   
  
    const query = "SELECT DISTINCT YEAR(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d')) AS year from loan l;";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});

//For averageAmount and other details
router.get("/year/:year",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b1432c153d4d1a',
        password:'f7493b11',
        database:'heroku_c1b66aa00f54d7b'
    })
   
    const year=req.params.year;
    const query = "SELECT SUM(l.`loan_amnt`) AS amount_applied, SUM(l.`funded_amnt`) AS amount_funded, SUM(l.`funded_amnt_inv`) AS amount_inv_comm FROM loan l WHERE YEAR(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d'))="+year;
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});

//Service for bar Chart

router.get("/bar/:year",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b1432c153d4d1a',
        password:'f7493b11',
        database:'heroku_c1b66aa00f54d7b'
    })
   
    const year=req.params.year;
    const query = "SELECT MONTH(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d')) AS name, COUNT(*) AS y FROM loan l WHERE YEAR(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d'))="+year+" GROUP BY MONTH(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d'))";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});



// Service for getting all grades
router.get("/grade/",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b1432c153d4d1a',
        password:'f7493b11',
        database:'heroku_c1b66aa00f54d7b'
    })

  
    const query = "select DISTINCT grade as grade from loan";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});

// Service for getting avg loan amount for specific grade
router.get("/lineGraph/:year/:grade",(req,res)=>{
    const connection = mysql.createConnection({
        host:'us-cdbr-iron-east-01.cleardb.net',
        user:'b1432c153d4d1a',
        password:'f7493b11',
        database:'heroku_c1b66aa00f54d7b'
    })
   const year=req.params.year;
   const grade=req.params.grade;
    const query = "SELECT l.`grade` as grade, MONTH(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d')) as month_no, AVG(l.`loan_amnt`) as aver_amt FROM loan l WHERE YEAR(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d'))="+year+" && grade='"+grade+"' GROUP BY MONTH(STR_TO_DATE(CONCAT(l.`issue_d`, '-01'), '%b-%Y-%d')), l.`grade`;";
   // const query = "Select * from users where FirstName='"+name+"'";
   connection.query(query,(err,rows,field)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.json(rows);
    connection.end();
    if(err){
        connection.end();
        
        throw err;
    }
    })
});




  

  module.exports = router;
