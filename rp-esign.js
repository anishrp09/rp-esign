let rpSignature = class{
	
	constructor(getParams){
		var rpEvent = this;
		this.defaultSetting = {
			penColor	 	 :  '#000',
			pointSize		 :  2,
			canvasbordercolor: 	'#c3c3c3',
			canvasbordersize : 	'1',
			canvaswidth 	 : 	'400',
			canvasheight	 : 	'200',
			imageformat      :	'image/png',
			
		};
		this.setting = {
			signaturePad		: (getParams.signaturePad !=undefined) ? getParams.signaturePad : null,
			penColor  			: (getParams.penColor !=undefined) ? getParams.penColor : this.defaultSetting.penColor,
			pointSize  			: (getParams.pointSize !=undefined) ? getParams.pointSize :  this.defaultSetting.pointSize,
			canvasbordercolor  	: (getParams.canvasbordercolor !=undefined) ? getParams.canvasbordercolor :  this.defaultSetting.canvasbordercolor,
			canvasbordersize  	: (getParams.canvasbordersize !=undefined) ? getParams.canvasbordersize :  this.defaultSetting.canvasbordersize,
			canvaswidth  		: (getParams.canvaswidth !=undefined) ? getParams.canvaswidth :  '',
			canvasheight  		: (getParams.canvasheight !=undefined) ? getParams.canvasheight :  this.defaultSetting.canvasheight,
			imageformat  		: (getParams.imageformat !=undefined) ? getParams.imageformat :  this.defaultSetting.imageformat,
			backgroundColor		: (getParams.backgroundColor !=undefined) ? getParams.backgroundColor : 'none',
			xstarting  			: '',
			ystarting  			: '',
			signLength  		: 0
		};
		
		if(this.setting.signaturePad)
		{
			
			rpEvent.setCanvas();
			rpEvent.canvas		= 	document.getElementById("rpCanvas");
			rpEvent.canvas.addEventListener("mousemove", function(e){
				
				rpEvent.draw_rpsign(e);
				});
			rpEvent.canvas.addEventListener("click", function(e){rpEvent.draw_rpclick(e);}, false);
		}
		window.addEventListener("resize", function(e){
			document.getElementById("rpCanvas").width =  document.getElementById(rpEvent.setting.signaturePad).offsetWidth;
		});
		
	}
	
	setCanvas(){
		var outerDiv = document.createElement('div');
		outerDiv.setAttribute("id", "canvasOuter");
		if(!this.setting.canvaswidth){
			this.setting.canvaswidth = document.getElementById(this.setting.signaturePad).offsetWidth;
			if(!this.setting.canvaswidth){this.setting.canvaswidth = this.defaultSetting.canvaswidth;}
		}
		outerDiv.innerHTML =
			'<canvas id="rpCanvas" width="'+this.setting.canvaswidth+'" height="'+this.setting.canvasheight+'" style="border:'+this.setting.canvasbordersize+'px solid '+this.setting.canvasbordercolor+';background:'+this.setting.backgroundColor+'"></canvas>';
		document.getElementById(this.setting.signaturePad).appendChild(outerDiv);
	}

	draw_rpsign(e){
		if(e.buttons==1){
			if(this.setting.xstarting && this.setting.ystarting){
				var ctx 			=	e.srcElement.getContext("2d");
				ctx.beginPath();
				ctx.moveTo(this.setting.xstarting, this.setting.ystarting);
				ctx.lineTo(e.offsetX, e.offsetY);
				ctx.lineWidth 	=	this.setting.pointSize;
				ctx.strokeStyle =	this.setting.penColor;
				ctx.stroke();
				this.setting.xstarting 		=	e.offsetX;
				this.setting.ystarting 		=	e.offsetY;
			}else{
				
				this.setting.xstarting 		=	e.offsetX;
				this.setting.ystarting 		=	e.offsetY;
			}
		}else{
			this.setting.xstarting 			=	'';
			this.setting.ystarting 			=	'';
		}
	}
	
	draw_rpclick(e)
	{
		var ctx = e.srcElement.getContext("2d");
			ctx.fillStyle = this.setting.penColor; 
			ctx.beginPath();
			ctx.arc(e.offsetX, e.offsetY, (this.setting.pointSize/2), 0, Math.PI * .1, true);
			ctx.fill();
	}
	
	getLength(x1,y1,x2,y2){
		var a 		=	x1 - x2;
		var b 		=	y1 - y2;
		var c 		=	Math.sqrt( a*a + b*b );
		return c;
	}
	
	getSign(){
		var imageData = this.canvas.toDataURL(this.setting.imageformat);
		var returnArray = {"image" :imageData, "image_lenght" : this.setting.signLength};
		return returnArray;
	}
	clearSign(){
		var ctx =	this.canvas.getContext("2d");
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.setting.xstarting =	'';
		this.setting.ystarting =	'';
		this.setting.signLength =	0;
	}
}
