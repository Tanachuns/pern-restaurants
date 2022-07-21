const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const db = require("./db")

const app = express();
dotenv.config({ path: './.env' });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port  = process.env.PORT;


//create
app.post("/restaurants",async(req,res)=>{
    try{
        const results = await db.query("INSERT INTO restaurants(name,location,price_range,rate) VALUES($1,$2,$3,$4) returning *;",
        [req.body.name,req.body.location,req.body.price_range,req.body.rating]);
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data:{
                restaurarant:results.rows
            }
        })
        
    }catch(err){
        console.log(err)
    }
});

//read one
app.get("/restaurants/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const results = await db.query(`select * from restaurants where id = ${id};`);
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data:{
                restaurarant:results.rows
            }
        })
    }catch(err){
        console.log(err)
    }
});

//read all
app.get("/restaurants", async(req,res)=>{
    try{
        const results = await db.query("select * from restaurants;");
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data:{
                restaurarant:results.rows
            }
        })
    }catch(err){
        console.log(err)
    }
});

//update
app.put("/restaurants/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const results = await db.query("UPDATE restaurants SET name=$1,location=$2,price_range=$3,rate=$4 WHERE id = $5 returning *;",
        [req.body.name,req.body.location,req.body.price_range,req.body.rating,id]);
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data:{
                restaurarant:results.rows
            }
        })
        
    }catch(err){
        console.log(err)
    }
});

//delete
app.delete("/restaurants/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const results = await db.query("DELETE FROM restaurants WHERE id = $1  returning *;",
        [id]);
        res.status(200).json({
            status:"success",
            results: results.rows.length,
            data:{
                restaurarant:results.rows
            }
        })
        
    }catch(err){
        console.log(err)
    }
});


app.listen(port,()=>{
    console.log(`server is up! @port = ${port}"`)
});
