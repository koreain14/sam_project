// 불꽃을 정의한다!!


	/*
	현실의 모든 사물은 객체지향언어에서 클래스로 표현되고, 
	해당 사물이 보유한 상태는 변수인 속성으로 표현하며,
	해당 사물이 보유한 동작은 함수인 메소드로 표현한다.

	하지만 변수와 함수가 객체의 소유가 될떄는 명칭이 바뀐다.
	변수: 객체가 보유한 상태를 표현한다고 해서 속성(property)
	함수: 객체가 보유한 동작방식을 표현한다고 해서 메서드(method)
	*/

	
/*
a; 어떤 div에 붙을지
w: 가로크기
h: 높이
posX: left위치
posY: top위치
*/
var flame=function(a,w,h,posX,posY){
	this.width=w;
	this.height=h;
	this.x=posX; //left
	this.y=posY; //top
	this.img;
	this.arr=new Array();
	this.area=a;
	this.count=0; // 이미지를 교체하면서 보여줄 index!

	//이 객체가 태어날때(메모리에 올라갈 때) 하고싶은 초기 작업에 사용될 메서드 정의!!
	this.init=function(){
		this.img=document.createElement("img");

		this.arr[0]="../images/flames/flame1.png"
		this.arr[1]="../images/flames/flame2.png"
		this.arr[2]="../images/flames/flame3.png"
		this.arr[3]="../images/flames/flame4.png"

		this.img.src=this.arr[this.count];
		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";

		

	
		//호출자가 결정하는 영역에 붙일거임!!
		this.area.appendChild(this.img);

		this.move();
	
	}
	
	// 동작방식 표현
	this.move=function(){
		var me=this;
		//이미지를 교체해서 보여주는 것이 목적!!
		//src의 값을 변경하면 된다!!
		//함수는 태어날와 움직일때의 함수 두가지만 만든다.
		
		this.img.src=this.arr[this.count];
		this.count++;
		if(this.count>=this.arr.length){
			this.count=0;
		}
		setTimeout(function(){
			me.move();
		},50);
		
	}
}

