
// ���!!

var http=require("http");
var mysql=require("mysql");
var fs=require("fs");
var express=require("express");
var bodyParser=require("body-parser");

// express��� ���

var app=express();

//�������̵�
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



// ���� ����
var server=http.createServer(app);
server.listen(9997,function(){
	console.log("��������!!9997");
});


