var Menu=function(stage,width,height,src){
	this.stage=stage;
	this.img;
	this.width=width;
	this.height=height;
	this.src=src;

	this.init()=function(){
		this.img=document.createElement("img");
		this.img.src=this.src;
		this.img.style.width=this.width+"px";
		this.img.style.height=this.height+"px";
		
		this.stage.appendChild(this.img);
	}
}