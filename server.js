var http=require("http"); //내부
var express=require("express"); //외부
var fs=require("fs"); //내부
var mysql=require("mysql"); //외부
var bodyParser=require("body-parser"); //외부
var ejs=require("ejs"); //외부

var app=express();

app.use(bodyParser.json()); //json지원
app.use(bodyParser.urlencoded({ extended: true }));//form태그로 전송될 경우 이 속성지정해야 함..
app.use(express.static(__dirname));


var client=mysql.createConnection({
	"url" : "localhost", 
	"user" : "root", 
	"password": ""

});

client.query("use project1"); //사용할 db 선택!!

/*---------------------------------------------------------------------------------------
 첫 화면 불러오기!!
---------------------------------------------------------------------------------------*/
app.route('/').get(function(request,response){
	var data=fs.readFileSync("./main.html","utf8");
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	response.end(data);
});

app.route("/signup").get(function(req,res){
	var data=fs.readFileSync("./signup.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});

/*---------------------------------------------------------------------------------------
회원정보 DB에 저장하기
---------------------------------------------------------------------------------------*/
app.route("/signup/write").post(function(request, response){
	console.log(request.body);

	var name=request.body.name;
	var email=request.body.email;
	var pwd1=request.body.pwd1;
	var pwd2=request.body.pwd2;
	var phone=request.body.phone;
	var zipcode=request.body.zipcode;
	var addr1=request.body.addr1;
	var addr2=request.body.addr2;

	var sql="insert into member2(name,email,pwd1,pwd2,phone,zipcode,addr1,addr2)";
	
	sql=sql+" values('"+name+"','"+email+"','"+pwd1+"','"+pwd2+"','"
								+phone+"','"+zipcode+"','"+addr1+"','"+addr2+"')";

	console.log(sql);

	client.query(sql,function(error,records){
		if (!error){
			console.log("성공했습니다.");
			response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			var content=fs.readFileSync("./signup2.html","utf8"); // 지정한 파일 읽어서 변수로 담아 놓자!!
			response.end(content);
		}else{
			console.log("입력실패");	
			response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
			var content=fs.readFileSync("./error.html","utf8"); // 지정한 파일 읽어서 변수로 담아 놓자!!
			response.end(content);
		}
	});
});

/*app.route("/signup2").get(function(request,response){
	var data=fs.readFileSync("./signup2.html","utf8");
	res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	res.end(data);
});*/

/*---------------------------------------------------------------------------------------
오더보기 요청 처리!!
---------------------------------------------------------------------------------------*/
app.route("/orderlist").get(function(request,response){
	var data=fs.readFileSync("./orderlist.html","utf8");
	
	var sql="select m.menu_id as menu_id , menu_name, m.price as price from menu m, orderlist o where m.menu_id = o.menu_id";

	client.query(sql , function(error, records){
		if(!error){
			console.log(records);	
			response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});	
			response.end(ejs.render(data,{dataList:records}));//클라이언트에게 응답을 하는 시점!!	
		}else{
			console.log("망햇어요ㅜㅜ");
		}
	});
});

/*---------------------------------------------------------------------------------------
메뉴보기 요청 처리!!
---------------------------------------------------------------------------------------*/
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

/*---------------------------------------------------------------------------------------
클라이언트가 등록을 원하면...post 방식으로 요청할 경우 주문
---------------------------------------------------------------------------------------*/
app.route("/order").post(function(request, response){
	var params=request.body.ch;

	//var ch=data.ch;
	var member_id=request.body.member_id;
	var name=request.body.ch1;
	var price=request.body.ch2;

	console.log(name);

	console.log("넘겨받은 ch 의 배열의 길이는  "+params.length);
	
	for(var i=0;i<params.length;i++){
		console.log(params[i]);

		var sql="insert into orderlist(menu_id,customer_id) values("+params[i]+", "+member_id+")";
		
		console.log(sql);

		client.query(sql, function(error, records, field){
			if(error){
				console.log("등록 실패입니다.");
			}else{
				console.log("등록 성공입니다.");
				response.redirect("/orderlist");
			}
		});
	}
});


app.listen(9996,function(){
	console.log("Server is running");
});