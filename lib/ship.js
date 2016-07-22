
var ship=function(stage,width,height,x,y,src){
	this.stage=stage;
	this.img;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.velX=0;
	this.velY=0;
	this.src=src; // 사용할 이미지 경로

	
	this.init=function(){
		this.img=document.createElement("img");
		this.img.src="../images/gallerxy/ship.png";
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		this.img.style.position="absolute";
		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		this.stage.appendChild(this.img);

		this.move();
	}
	
	this.move=function(){
		var me=this;		
		this.x=this.x+this.velX;
		this.Y=this.y+this.velY;

		this.img.style.left=this.x+"px";
		this.img.style.top=this.y+"px";

		//적군과 충돌시 총알제거..


		//총알이 시야에서 사라지면 setTimeout 종료!!

		setTimeout(function(){
			me.move();
		},10);
	}
}