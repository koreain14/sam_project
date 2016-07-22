var http=require("http");
var express=require("express");
var fs=require("fs");

var app=express();

app.route('/').get(function(req,res){
	var data=fs.readFileSync("./main.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});

app.route("/signup").get(function(req,res){
	var data=fs.readFileSync("./signup.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});


app.listen(9996,function(){
	console.log("Server is running");
});