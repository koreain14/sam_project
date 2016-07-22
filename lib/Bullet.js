/*
↓↓↓↓ 아래의 코드는 지금 당장 사용할 총알 자체가 아닌, 장차 총알을 생성해낼 틀이다!!  ↓↓↓↓

객체 메뉴얼!! : 객체 사용법
s: 이 총알이 어떤 div에 붙을지를 결정하세요.
posY: 이 총알이 어느 Y좌표에서부터 날아갈지 결정하세요!!
API document.
*/

var Bullet=function(stage,x,y){
	/*총알을 정의한다!*/

	// 객체의 특징에 대한 값을 담고 있다고하여, 속성이라고 한다.
	// property라고 표기한다!!
	
	this.stage=stage;
	this.span; // span을 정의하는 것!!
	this.x=x;
	this.y=y;
	this.st; // 나의 셋타임아웃을 가리키기 위한 변수!
	this.velX=10; // 몇 픽셀씩 움직일지

	// 객체 안에 들어있는 함수는 method 메서드라 한다!!
	//method(방법): 객체의 동작 방식을 결정하는 로직이 들어있기 때문에 method라고 부름!!

	this.init=function(){
		this.span=document.createElement("span");//"span"은 태그명!!
		this.span.innerText="●"; // Tag와 Tag사이에 글씨를 넣을 때는 innerTag!
		this.span.style.color="orange";

		this.span.style.position="absolute";
		this.span.style.left=this.x+"px";
		this.span.style.top=this.y+"px"; // 호출하는 자가 바꾸기 위해서 매개변수로 가자!!

		this.span.style.width=10+"px";
		this.span.style.height=10+"px";

		this.stage.appendChild(this.span);

	// ↑↑↑ 여기까지는 span을 설정한 것↑↑↑ 무조건 수행하면 안되는 영역이여서 함수로 감싼다!!

	this.move();
	}

	this.hitTest=function(){
		for(var i=0;i<enemyArray.length;i++){
			if(enemyArray[i]!=undefined){//배열에 존재하는 img에 대해서만 즉 undefined가 아닌 경우만
			var result=hitTest(this.span, enemyArray[i].img);
			
			if(result){
				//총알 죽이고 setTimeout중지!!
			this.stage.removeChild(this.span);
			clearTimeout(this.st);
			
			//적군 죽이고
			this.stage.removeChild(enemyArray[i].img);
			clearTimeout(enemyArray[i].st);
			delete enemyArray[i]; //배열에서 제거(배열을 마지막에 제거)
					}

			
			}
		}


	this.move=function(){
			var me=this;
			this.x+=this.velX;
			this.span.style.left=this.x+"px";
			// stage 를 벗어나면 총알의 setTimeout 멈추자!
	
			this.st=setTimeout(function(){
				me.move();
			},10);

			// 적군과 부딪히면...

				}
			
				
				// 부딪히지 않고 화면 밖으로 나가면....

				if(parseInt(this.span.style.left)>parseInt(this.stage.style.width)){
					clearTimeout(this.st);
					this.stage.removeChild(this.span);
					return;
				}
	        }		
		}	
	

