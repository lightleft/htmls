"use strict";
		/***
		*style设置方法
		*参数介绍   dom 原生js——dom对象 
		*			key_or_o style属性名 或 键值对对象
		*			普通属性名时 value为属性值 eg  (dom,'width','100px')
		*			键值对对象时 value忽略	eg  (dom,{width:'100px',height:'100px'});
		*
		**/
		let setStyle=function(dom,key_or_o,value){
			if(typeof key_or_o ==='object'){
				for(let k in key_or_o){
					dom.style[k] = key_or_o[k];
				}
			}else{
				dom.style[key]=value;
			}
		}
		/***
		*describe:  原生js继承baseClass 用于实现继承
		*author: xiao
		*version: 1.0.1
		**/
		let x_clazz= (function(){
			function _mix(c,p){
				for(let i in p){
					if(p.hasOwnProperty(i)){
							c[i]=p[i]
					}
				}
			};
			Object.x_extend = _mix;
			let _ext=function (){
				this.initPrototype = false;
				let prototype = new this();
				this.initPrototype=true;
				let params = Array.prototype.slice.call(arguments)||[];
				let param;
				while(param = params.shift()){
				_mix(prototype,param.prototype||param);
				}
			
				function xClass(){
					if(!this.initPrototype&&this.init){
						this.init.apply(this,arguments);
					}
				}
				xClass.prototype =prototype;
				xClass.prototype.constructor = xClass;
				xClass.extend  = _ext;
				return  xClass;
			};
			let _c = function(){};
			_c.extend=_ext;
			return _c;
		})();
		
		/***
		*describe: 轮播图组件  使用在页面定义一个div 设定宽高即可 new x_lb(options);完成轮播图加载
		*		   options参数介绍   id： 定义div的id  
		*			 				 imgs：对象数组 形如[{src:'路径',href:'链接'},{},。。。] href可省略
		*							 speed(可选):轮播速度 默认2
		*							 spacing(可选):图片间隔 默认 5px
		*							 spacing_h(可选):上下间隔 默认 5px;
		*							 left_style: 左边箭头div样式设置  eg  {background:url(...),key:value,...}
		*							 body——style：展示div样式设置  eg  {background:url(...),key:value,...}
		*							 right——style：右边箭头div样式设置  eg  {background:url(...),key:value,...}
		*							
		*author: xiao
		*version: 1.0.1
		**/
		let x_lb = x_clazz.extend({init:function(o){
			let _o = {
				id:'x_lb',
				imgs:[],
				spacing:5,
				speed:2,
				spacing_h:5
			};
			Object.x_extend(_o,o);
			this.render(_o);
			},
			render:function(o){
				let dom=document.getElementById(o.id);
				dom.setStyle=setStyle;
				let h = dom.clientHeight;
				let w = dom.clientWidth;
				if(!dom){
				throw new Error('找不到指定id,无法初始化轮播图');
				}
				setStyle(dom,{border:'1px solid black'});
				let ul=document.createElement('ul');
				let _w=0;
				for(let i in o.imgs){
					let li=document.createElement('li');
					let a=document.createElement('a');
					let img = document.createElement('img');
					setStyle(li,{'float':'left',height:(h-o.spacing*2)+"px",padding:o.spacing_h+'px '+o.spacing/2+"px"});
					img.src=o.imgs[i].src;
					a.href = o.imgs[i].href||'javascript:void(0)';
					setStyle(img,{height:(h-o.spacing_h*2)+"px",width:(h-o.spacing*2)+"px"});
					_w+=h-o.spacing;
					a.appendChild(img);
					li.appendChild(a);
					ul.appendChild(li);
				}
				setStyle(ul,{'list-style':'none',margin:'0 ',padding:0,height:h+'px',width:_w+'px'});
				if(_w<w){
				dom.appendChild(ul);
				}else{
					let p = document.createElement("div");
					setStyle(p,{width:w*0.07+'px',height:h+'px'});
					if(o.left_style){
						setStyle(p,o.left_style);
					}
					setStyle(p,{float:'left'});
					let body = document.createElement('div');
					setStyle(body,{width:0.85*w+'px',height:h+'px'});
					if(o.body_style){
						setStyle(body,o.body_style);
					}
					setStyle(body,{float:'left',overflow:'hidden'});
					let n = document.createElement("div");
					setStyle(n,{width:w*0.07+'px',height:h+'px'});
					if(o.right_style){
						setStyle(n,o.right_style);
					}
					setStyle(n,{float:'right'});
					let timer;
					let _flag=true;
					function stop(){
						if(timer){
							clearInterval(timer);
							_flag=true;
						}
					}
					function start(f){
						if(_flag){
							timer=setInterval(function(){
							let dom = document.getElementById('x_lb');
							if(f=='l'){			
								body.scrollLeft-=o.speed;
							}else{
								body.scrollLeft+=o.speed;
							}
							},13);
						_flag=false;
						}
					}
					p.onmouseover=function(){
						start('l');
					}
					n.onmouseover=function(){
						start('r');
					}
					p.onmouseout=stop;
					n.onmouseout=stop;
					dom.appendChild(p);
					dom.appendChild(body);
					body.appendChild(ul);
					dom.appendChild(n);
				}
			}
		});