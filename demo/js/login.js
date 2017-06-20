"use strict";
		window.onload = function(){
		let oLogin = document.getElementById("login");
		let oTitle = document.getElementById("title");
		let t = document.documentElement.clientHeight;//页面高度
		let l = document.documentElement.clientWidth;//页面宽度
		let oW = oLogin.clientWidth; //div 宽度
		let oH = oLogin.clientHeight;	//div高度
		let oL = oLogin.offsetLeft;		//div 偏移left
		let oT = oLogin.offsetTop;		// div 偏移top
		let timer=null;let  speedX=0,speedY=0;
		let min_x=2,min_Y=2,max_x = l-oW-2,max_y=t-oH-2;
		function start(){
		 speedY=0;
			timer = setInterval(function(){
				speedY += 1;
				speedX *= 0.98;
				 oT +=speedY;
				 oL += speedX;
				if(oT>max_y){
					oT =max_y;
					speedY*=-0.75;
				}else if(oT<min_x){
				oT = min_x;
				speedY*=-0.75;
				}
				if(oL>max_x){
					oL = max_x;
					speedX *=-1;
				}else if(oL<min_x){
				oL=min_x;
				speedX *=-1;}
				oLogin.style.top = oT+"px";
				oLogin.style.left = oL+"px";
			},13);
		}
		start();
		oTitle.onmousedown = function(e){
			clearInterval(timer);
			let _e = e||window.event;
			let sx = _e.clientX;
			let disX =  _e.clientX - oL;
			let disY = _e.clientY-oT;
			document.onmousemove = function (ed){
				let _ed = ed||window.event;
				speedX = _ed.clientX -sx;
				sx = _ed.clientX;
				let X = _ed.clientX-disX;
				let Y = _ed.clientY-disY;
				if(X<min_x){
				X = min_x;
				}else if(X>max_x){
				X = max_x;
				}
				if(Y<min_Y){
				Y=min_Y;}else if(Y>max_y){
					Y=max_y;
				}
				oL =X;
				oT = Y;
				oLogin.style.left=X+"px";
				oLogin.style.top=Y+"px";
			}
			document.onmouseup = function (){
				document.onmousemove =null;
				document.onmouseup=null;
				speedX*=0.5;
				start();
			}
		}
		}