/*
총알이 위로 날라가는 게임에 적절함!
*/
var Bullet2=function(stage,width,height,x,y){
	this.stage=stage;
	this.width=width;
	this.height=height;
	this.x=x;
	this.y=y;
	this.img;
	this.velY=2; // 몇씩 움직일지!
	this.st;

	this.init=function(){
		this.img=document.createElement("img");
		this.img.src="../images/gallerxy/bullet.png"
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
		
		this.y=this.y-this.velY;
		this.img.style.top=this.y+"px";

		//적군과 충돌시 총알제거
		// 대왕파리와 나와 서로 마주쳤나 판단하기!!
		for(var i=0;i<kingArray.length;i++){
			var result=hitTest(this.img , kingArray[i].img);
			if(result){
			console.log("킹과 마주쳤어!!");

			this.stage.removeChild(kingArray[i].img);
			kingArray[i].stop();

			this.stage.removeChild(this.img);
			clearTimeout(this.st);

			break;
			return;
		
		}

		setTimeout(function(){
			me.move();
		},10);
	}
}