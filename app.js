//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/customerDB",{useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public/"));


const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Customer = new mongoose.model("Customer",customerSchema);



app.get("/",function (req,res) {
    res.render("index");
});

app.post("/",function (req,res){
        
    const newCustomer = new Customer({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
    });

    Customer.find({name: req.body.name},function (foundCustomer) {
        if(foundCustomer){
            console.log("Customer already saved in DB");
            res.redirect("/");
        }else{
            newCustomer.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("New Customer added to DB");
                    res.redirect("/");
                }
            });

        }
        
    });

});











app.listen(3000,function (req,res) {
    console.log("Server has Started running on port 3000");
});