
// 모듈!!

var http=require("http");
var mysql=require("mysql");
var fs=require("fs");
var express=require("express");
var bodyParser=require("body-parser");

// express모듈 사용

var app=express();

//페이지이동
app.get('/', function(req,res){
	var data=fs.readFile("main.html",function(error,data){
		if(error){
			console.log(error);
		}else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
			res.end(data);

		}	
	});
		
});

app.get('/signup', function(req,res){
	var data=fs.readFile("signup.html",function(error,data){
		if(error){
			console.log(error);
		}else{
			res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
			res.end(data);

		}	
	});
		
});



// 서버 구동
var server=http.createServer(app);
server.listen(9997,function(){
	console.log("서버구동!!9997");
});


