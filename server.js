var http=require("http"); //내부
var express=require("express"); //외부
var fs=require("fs"); //내부
var mysql=require("mysql"); //외부
var bodyParser=require("body-parser"); //외부
var ejs=require("ejs"); //외부

//express모듈로 부터 application 객체를 생성하자!!
var app=express();

app.use(bodyParser.json()); //json지원
app.use(bodyParser.urlencoded({ extended: true }));//form태그로
//전송될 경우 이 속성지정해야 함..

var client=mysql.createConnection({//mysql 서버에 접속!!!	
	"url" : "localhost", 
	"user" : "root", 
	"password": ""
});

client.query("use project1"); //사용할 db 선택!!



//정적 파일들( 이미지, .css, .js  등은 웹사이트의 루트 경로로 올리자!! *****이미지******
app.use(express.static(__dirname));


app.route('/').get(function(req,res){
	var data=fs.readFileSync("./main.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});





//클라이언트가 등록을 원하면...post 방식으로 요청할 경우 
app.route("/order").post(function(request, response){
	var params=request.body.ch;

	//var ch=data.ch;
	var member_id=request.body.member_id;	
	console.log("넘겨받은 ch 의 배열의 길이는  "+params.length);
	
	for(var i=0;i<params.length;i++){
		console.log(params[i]);

		var sql="insert into orderlist(menu_id,customer_id) values("+params[i]+", "+member_id+")";
		
		console.log(sql);

		client.query(sql , function(error, records, field){
			if(error){
				console.log("등록 실패입니다.");
			}else{
				console.log("등록 성공입니다.");
				response.redirect("/list");
			}
		});
	}
});



/*

app.route("/signup").get(function(req,res){
	var data=fs.readFileSync("./signup.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});

*/

app.route("/list").post(function(request, response){
	var data=request.body;

	var name=data.name;
	var email=data.email;
	var pwd1=data.pwd1;
	var phone=data.phone;
	var addr=data.addr;

	console.log("이름"+name);
	console.log("이메일"+email);
	console.log("비번"+pwd1);
	console.log("전번"+phone);
	console.log("주소"+addr);

	client.query("insert into member(name,email,pwd,addr) values('"+name+"','"+email+"','"+pwd1+"','"+phone+"','"+addr+"')" , function(error, records, field){
		if(error){
			console.log("등록 실패입니다.");
		}else{
			console.log("등록 성공입니다.");
			response.redirect("/signup");
		}
	});

});


app.route("/signup2").get(function(req,res){
	var data=fs.readFileSync("./signup2.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});


//메뉴 보기 요청 처리
app.route("/menu").get(function(request, response){
	//list.html 페이지를 읽어들인 결과를 page변수에 담음..
	var page=fs.readFileSync("./menu.html", "utf8");
	
	//응답전에 이미 데이터베이스에서 레코드들을 가져왔어야 한다...
	client.query("select * from menu", function(error, records){
		if(!error){
			console.log(records);	
			response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});	
			response.end(ejs.render(page,{dataList:records}));//클라이언트에게 응답을 하는 시점!!	
		}else{
			console.log("망햇어요ㅜㅜ");
		}
	});
});



app.listen(9996,function(){
	console.log("Server is running");
});