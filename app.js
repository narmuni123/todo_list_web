const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

const items = [];
const workItems = [];

app.get("/", function(req, res){
  
  const day = date.getDate();

    res.render("list.ejs", {listTitle: day, newListItems: items});
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "work List", newListItems: workItems});
});

app.post("/work", function(req, res){
  let item =req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.post("/", function(req, res){

  let item = req.body.newItem;
  if(req.body.newItem === "work"){
    workItems.push(item);
  res.redirect("/work");
  }else{
    items.push(item);
  res.redirect("/");
  }
  
});

app.listen(3000, function(req, res){
    console.log("server started at port 3000");
});
