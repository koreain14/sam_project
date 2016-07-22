var Rockman=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.div;
	this.img;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.src=src;
	this.velX=0; // X축의 방향으로 얼만큼 움직일지 정도를 표현하는 변수!!
	this.velY=2; // Y축의 방향으로 얼만큼 움직일지 정도를 표현하는 변수!!
	this.gravity=0.1;// 중력을 표현하는 변수!!
	this.falling=true;// 주인공이 떨어지고 있음을 알 수 있는 변수!!
	this.jumping=true;// 주인공이 점프 중임을 알 수 있는 변수!!


	this.init=function(){
		this.div=document.createElement("div");
		this.img=document.createElement("img");
		this.img.src=this.src;
		
		this.div.style.overflow="hidden";
		this.div.style.position="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.div.style.width=width;
		this.div.style.height=height;


		// 숨겨진 이미지의 좌표처리
		this.img.style.position="relative";
		//this.img.style.top=-65+"px";

		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";

		// 이미지를 div에 탑재
		this.div.appendChild(this.img);

		// div를 stage에 탑재
		this.stage.appendChild(this.div);

		this.move();

	}

	this.move=function(){
		var me=this;

		// 중력 데이터를 velY에 누적해보자!!
		this.velY+=this.gravity;

		if(this.velY>0){
			this.jumping=false;
			this.falling=true; // 주인공이 떨어지고 있음을 
			
		}

		//블러과 마주쳤는지 체크
		for(var i=0;i<blockArr.length;i++){
			var result=hitTest(this.div , blockArr[i].img);
			if(result && this.falling){
				this.velY=0;// 밟으면 떨어지지 않게 velY=0.
				this.falling=false;
			}
		
		}

		this.y+=this.velY;
		this.x+=this.velX;

		this.div.style.top=this.y+"px";
		this.div.style.left=this.x+"px";

		setTimeout(function(){
			me.move();
		},10);
	
	}

}