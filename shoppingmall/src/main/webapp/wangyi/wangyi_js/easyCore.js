/*
 * easyCore
 *
 * [Depend On]
 *		jQuery 1.4.2+
 *
 * [Change Log]
 * 2013-07-01 马超 基于easyCore进行修改而来
 *
 */
(function(window, $, undefined){ //easyBase组件集合
//base.fix.js
(function(){try{document.execCommand("BackgroundImageCache",false,true)}catch(e){};$.extend(Number.prototype,{Round:function(b,c){var a=Math.pow(10,b||0);return c==0?Math.ceil(this*a)/a:Math.round(this*a+(5-(c||5))/10)/a},Cint:function(a){return this.Round(0,a)}});var f=/./,regCompile=f.compile&&f.compile(f.source,"g");RegExp.regCompile=regCompile;$.extend(String.prototype,{trim:function(){return this.replace(/^(?:\s|\xa0|\u3000)+|(?:\s|\xa0|\u3000)+$/g,"")},byteLen:function(){return this.replace(/([^\x00-\xff])/g,"ma").length},cutString:function(a,b){var c=/([^\x00-\xff])/g,reg2=/([^\x00-\xff]) /g;if(b){var d=String(b),hdLen=d.length,str=this.replace(c,"$1 ");a=a>=hdLen?a-hdLen:0;b=str.length>a?d:"";return str.substr(0,a).replace(reg2,'$1')+b}return this.substr(0,a).replace(c,'$1 ').substr(0,a).replace(reg2,'$1')}});$.fn.fixPosition=function(){var d=this,t,b,l,r,css=function(o,a){var c=(o[0].currentStyle[a]);return c.indexOf("%")+1?false:(o.css(a).replace(/\D/g,"")||null)},win=$(window),top,left,fn;if(d.css("position")=="absolute"){t=css(d,"top");b=css(d,"bottom");l=css(d,"left");r=css(d,"right");top=+win.scrollTop();left=+win.scrollLeft();fn=function(e){var a=e.type=="resize",isHide;if(a){isHide=d.is(":hidden");if(!isHide)d.hide()}var c=+win.scrollTop(),_left=+win.scrollLeft();b&&d.css("bottom",+b+1).css("bottom",b+"px");t&&d.css("top",(+t+c-top)+"px");r&&d.css("right",+r+1).css("right",r+"px");l&&d.css("left",(+l+_left-left)+"px");if(a&&!isHide)d.show()};win.scroll(fn).resize(fn)}return d}})();
//base.678.js
(function(){$.isIE678="\v"=="v";if($.isIE678){$.isIE8=!!'1'[0];$.isIE6=!$.isIE8&&(!document.documentMode||document.compatMode=="BackCompat");$.isIE7=!$.isIE8&&!$.isIE6;$.fn.extend({_bind_:$.fn.bind,bind:function(a,b,c){/^click$/gi.test(a)&&d(this);return this._bind_(a,b,c)}});var d=function(b){var n=b.length,i=0,dom;for(;i<n;i++){dom=b[i];if(!dom.fixClick){dom.fixClick=true;$(dom).bind("dblclick",function(e){var a=e.target,n=0;while(a&&a.nodeType!==9&&(a.nodeType!==1||a!==this)){if(a.nodeType===1){if(a.fixClick)return}a=a.parentNode}e.type="click";e.source="dblclick";$(e.target).trigger(e)})}}};var f="abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),i=f.length;while(i--)document.createElement(f[i])}})();
//base.tools.js
$.extend({getUrlPara:function(a){var b=window.location.search.replace(/^\?/g,""),dstr=b;try{dstr=decodeURI(b)}catch(e){dstr=b.replace(/"%26"/g,"&")}return $.getParaFromString(dstr,a)},getHashPara:function(a){return $.getParaFromString(window.location.hash.replace(/^#*/,""),a)},getPara:function(a){return $.getUrlPara(a)||$.getHashPara(a)},getParaFromString:function(b,c){try{if($.trim(b).length<=0)return{};var d=b.split('&'),obj={};$.each(d,function(){var a=this.split('=');obj[a[0]]=decodeURIComponent(a[1])});if(c===undefined){return obj}else{return obj[c]||''}}catch(e){}},safeHTML:function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},safeRegStr:function(a){return String(a).replace(/([\\\(\)\{\}\[\]\^\$\+\-\*\?\|])/g,"\\$1")},falseFn:function(){return false},stopProp:function(e){e.stopPropagation()},preventDft:function(e){e.preventDefault()},isLeftClick:function(e){return e.button==("\v"=="v"?1:0)},addUrlPara:function(a,b){var c=(a+"").indexOf("?")+1?"&":"?";return a+c+b},addFav:window.sidebar&&window.sidebar.addPanel?function(a,b){window.sidebar.addPanel(b,a,"")}:function(a,b){try{window.external.addFavorite(a,b)}catch(e){window.alert("请尝试点击 Ctrl + D 来添加！")}},formatTime:function(b,c){var e=/^\d+$/gi.test(b+"")?+b:Date.parse(b);if(isNaN(e))return b;var D=new Date(e),zz=function(a){return("0"+a).slice(-2)},yyyy=D.getFullYear(),M=D.getMonth()+1,MM=zz(M),d=D.getDate(),dd=zz(d),h=D.getHours(),hh=zz(h),m=D.getMinutes(),mm=zz(m),s=D.getSeconds(),ss=zz(s);return(c||"yyyy-MM-dd hh:mm:ss").replace(/yyyy/g,yyyy).replace(/MM/g,MM).replace(/M/g,M).replace(/dd/g,dd).replace(/d/g,d).replace(/hh/g,hh).replace(/h/g,h).replace(/mm/g,mm).replace(/m/g,m).replace(/ss/g,ss).replace(/s/g,s)}});$.fn.extend({disabled:function(b){return this.each(function(){var a=this.bindDownCssFix||"",dis=!b?"disabled"+a:b;$(this).attr("disabled","disabled").addClass(dis)[0].disabled=true})},enabled:function(b){return this.each(function(){var a=this.bindDownCssFix||"",dis=!b?"disabled"+a:b;$(this).removeClass(dis).removeAttr("disabled")[0].disabled=false})}});
//base.format.js
(function(){var g=RegExp.regCompile?/./.compile("\\{([\\w\\.]+)\\}","g"):/\{([\w\.]+)\}/g;$.format=function(d,e){var f=true,N,numReg,data=e===undefined?null:$.isPlainObject(e)?(f=false,e):$.isArray(e)?e:Array.prototype.slice.call(arguments,1);if(data===null)return d;N=f?data.length:0;numReg=regCompile?/./.compile("^\\d+$"):/^\d+$/;return String(d).replace(g,function(a,b){var c=numReg.test(b),n,fnPath,val;if(c&&f){n=parseInt(b,10);return n<N?data[n]:a}else{fnPath=b.split(".");val=data;for(var i=0;i<fnPath.length;i++)val=val[fnPath[i]];return val===undefined?a:val}})}})();
//base.cookie.js
$.cookie=function(a,b,c){if(arguments.length>1&&(b===null||typeof b!=="object")){c=$.extend({},c);if(b===null){c.expires=-1}if(typeof c.expires==='number'){var d=c.expires,t=c.expires=new Date();t.setDate(t.getDate()+d)}return(document.cookie=[encodeURIComponent(a),'=',c.raw?String(b):encodeURIComponent(String(b)),c.expires?'; expires='+c.expires.toUTCString():'',c.path?'; path='+c.path:'',c.domain?'; domain='+c.domain:'',c.secure?'; secure':''].join(''))}c=b||{};var e,decode=c.raw?function(s){return s}:decodeURIComponent;return(e=new RegExp('(?:^|; )'+encodeURIComponent(a)+'=([^;]*)').exec(document.cookie))?decode(e[1]):null};
//localStorage组件
(function(g){var h,noop=function(){},document=g.document,notSupport={set:noop,get:noop,remove:noop,clear:noop,each:noop,obj:noop};(function(){if("localStorage"in g){try{h=g.localStorage;return}catch(e){}}var o=document.getElementsByTagName("head")[0],hostKey=g.location.hostname||"localStorage",d=new Date(),doc,agent;if(!o.addBehavior){try{h=g.localStorage}catch(e){h=null}return}try{agent=new ActiveXObject('htmlfile');agent.open();agent.write('<s'+'cript>document.w=window;</s'+'cript><iframe src="/favicon.ico"></frame>');agent.close();doc=agent.w.frames[0].document;o=doc.createElement('head');doc.appendChild(o)}catch(e){o=document.getElementsByTagName("head")[0]}try{d.setDate(d.getDate()+36500);o.addBehavior("#default#userData");o.expires=d.toUTCString();o.load(hostKey);o.save(hostKey)}catch(e){return}var c,attrs;try{c=o.XMLDocument.documentElement;attrs=c.attributes}catch(e){return}var f="p__hack_",spfix="m-_-c",reg1=new RegExp("^"+f),reg2=new RegExp(spfix,"g"),encode=function(a){return encodeURIComponent(f+a).replace(/%/g,spfix)},decode=function(a){return decodeURIComponent(a.replace(reg2,"%")).replace(reg1,"")};h={length:attrs.length,isVirtualObject:true,getItem:function(a){return(attrs.getNamedItem(encode(a))||{nodeValue:null}).nodeValue||c.getAttribute(encode(a))},setItem:function(a,b){try{c.setAttribute(encode(a),b);o.save(hostKey);this.length=attrs.length}catch(e){}},removeItem:function(a){try{c.removeAttribute(encode(a));o.save(hostKey);this.length=attrs.length}catch(e){}},clear:function(){while(attrs.length){this.removeItem(attrs[0].nodeName)}this.length=0},key:function(i){return attrs[i]?decode(attrs[i].nodeName):undefined}};if(!("localStorage"in g))g.localStorage=h})();g.LS=!h?notSupport:{set:function(a,b){if(this.get(a)!==undefined)this.remove(a);h.setItem(a,b)},get:function(a){var v=h.getItem(a);return v===null?undefined:v},remove:function(a){h.removeItem(a)},clear:function(){h.clear()},each:function(a){var b=this.obj(),fn=a||function(){},key;for(key in b)if(fn.call(this,key,this.get(key))===false)break},obj:function(){var a={},i=0,n,key;if(h.isVirtualObject){a=h.key(-1)}else{n=h.length;for(;i<n;i++){key=h.key(i);a[key]=this.get(key)}}return a}};if(g.jQuery)g.jQuery.LS=g.LS})(window);
//base.msg.js
(function(){var g=$("<div>"),slice=Array.prototype.slice;$.extend({sendMsg:function(a){return g.triggerHandler("msg."+a,slice.call(arguments,1))},bindMsg:function(a,b,c,d){if(!a||!$.isFunction(b))return this;var f=function(e){return b.apply(c||window,slice.call(arguments,1))};if(b.guid)f.guid=b.guid;g[d?"one":"bind"]("msg."+a,f);if(!b.guid)b.guid=f.guid;return this},bindMsgOnce:function(a,b,c){return this.bindMsg(a,b,c,1)},unbindMsg:function(a,b){if(!a||!$.isFunction(b))return this;g.unbind("msg."+a,b);return this}})})();
//base.load.js
(function(){var j={},load=function(b,c,d,e,f){var g=c.toLowerCase().replace(/#.*$/,"").replace("/\?.*$/",""),tag,head,isFunc=$.isFunction,cache=j[g]||[],userChk=(d||$.noop)(c),GC=window.CollectGarbage||$.noop;if(userChk===true){isFunc(e)&&e();return}j[g]=cache;if(!cache||!cache.loaded||userChk==false){isFunc(e)&&cache.push(e);cache.loaded=1;tag=document.createElement(b),head=document.getElementsByTagName("head")[0]||document.documentElement;c=c+(c.indexOf("?")>=0?"&":"?")+Core.version;if(b=="link"){tag.rel="stylesheet";tag.type="text/css";tag.media="screen";tag.charset=f||"UTF-8";tag.href=c}else{tag.type="text/javascript";tag.charset=f||"UTF-8";var h=false;tag.onload=tag.onreadystatechange=function(){if(!h&&(!this.readyState||{loaded:1,complete:1}[this.readyState])){h=true;tag.onload=tag.onreadystatechange=null;this.parentNode.removeChild(this);var a=j[g],n=a.length,i=0;a.loaded=2;for(;i<n;i++)isFunc(a[i])&&a[i]();a.length=0;a=head=tag=null;GC()}};tag.src=c}head.appendChild(tag,head.lastChild)}else if(cache.loaded==2){isFunc(e)&&e();cache=null;GC()}else{isFunc(e)&&cache.push(e);cache=null;GC()}},fixURL=function(a,b){if(!b)return a;return/^http/i.test(a)?a:(b.replace(/\/*$/,"")+a)};$.extend({loadJS:function(b,c,d,e,f){if(!$.isFunction(d)){f=e;e=d;d=c;c=null}if(!$.isFunction(d)){f=e;e=d;d=null}if(/^http/i.test(e)){f=e;e=""}if($.isArray(b)){var N=b.length,loadNo=function(a){if(a<N){load("script",fixURL(b[a],f),c,function(){loadNo(a+1)},e)}else{$.isFunction(d)&&d()}};loadNo(0)}else load("script",fixURL(b,f),c,d,e);return this},loadCss:function(a,b){if($.isArray(a)){var N=a.length,i=0;for(;i<N;i++)load("link",fixURL(a[i],b))}else load("link",fixURL(a,b));return this}})})();
//base.ajax.js
(function(){var l="163.com",baseReg=/\.163\.com$/i,altDomain=function(a){var d=(a+"").toLowerCase(),i=d.indexOf("http");return i<0?baseReg.test(d)?d:"":i?"":d.replace(/^https?:\/\//,"").replace(/\/.+$/,"")},agentCache={},createAgent=function(b,c){var d=altDomain(b),host=window.location.host+"",agent=agentCache[d],url=b.replace(/https?:\/\/[^\/]+?/,"\1")+"/agent/ajaxAgent.htm";if(!d||d==host){c($);return}if(agent){c(agent);return}if(!document.body){window.setTimeout(function(){createAgent(b,c)},1);return}var e=$("<iframe scrolling='no' frameborder='0' width='0' height='0'/>").insertAfter(document.body).bind("load",function(){var a=agentCache[d]=e[0].contentWindow.jQuery;a?c(a):alert("跨域代理文件错误！<br/>"+escape(url))}).attr("src",url)},parseJSON=function(a){a=a.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g,"new Date($2)");return(new Function("return "+a))()},httpCache={},ajax=function(b,c,d,e,f){var g=window.location.host+"",domain=altDomain(c)||g,protocol="http:",port="80",fn;if(/^(https?:)/i.test(c)){protocol=RegExp.$1.toLowerCase();if(/:(\d+)/i.test(c))port=RegExp.$1||"80"}else{protocol=window.location.protocol;port=window.location.port||"80"}if(window.location.protocol!=protocol||(window.location.port||"80")!=port){fn=$.isFunction(e)?e:$.isFunction(d)?d:$.noop;fn.call(Core,2,"","protocols or ports not match");return}if(baseReg.test(domain)&&baseReg.test(g)&&document.domain==l&&protocol=="http:"){createAgent(domain,function(a){ajaxCore(a,b,c,d,e,f)})}else{ajaxCore(jQuery,b,c.replace(/https?:\/\/[^\/]+/,""),d,e,f)}},ajaxCore=function(d,f,g,h,i,j){var k=$.isFunction(i)?i:$.noop,URL=g,xhr,state,lib=Core,noCache=false,cachePara=(URL.indexOf("?")+1?"&":"?")+"cache="+(+new Date()),typeInfo,retType;if($.isFunction(h)){k=h;h=null;j=i}if(j&&j.indexOf("*")==0){noCache=true;j=j.substr(1)}if(j){xhr=httpCache[j];if(xhr){if(j.indexOf("@")!==0)return;state=xhr.readyState;if(state>0&&state<5){try{xhr.aborted=true}catch(e){}xhr.abort()}}}typeInfo=f.split(".");retType=typeInfo.length>1?typeInfo[1]:"";xhr=d.ajax({url:URL+(noCache?"":cachePara),type:typeInfo[0],data:h,success:function(a,b,c){delete httpCache[j];if(c.aborted)return;a=c.responseText;if(a==undefined||a==null||a==""||a.indexOf("<!DOCTYPE")>=0){if(retType=="JSON"){try{a=parseJSON(a)}catch(e){k.call(lib,3,c.responseText,b);return}}k.call(lib,1,a,b);return}k.call(lib,0,a,b)},error:function(a,b){delete httpCache[j];if(!b||b=="error"){k.call(lib,1,"",b);return}if(a.aborted)return;k.call(lib,1,a.responseText,b)}});j&&(httpCache[j]=xhr)};$.extend({get2:function(a,b,c,d){ajax("GET",a,b,c,d);return this},post2:function(a,b,c,d){ajax("POST",a,b,c,d);return this},getJSON2:function(a,b,c,d){ajax("GET.JSON",a,b,c,d);return this},postJSON2:function(a,b,c,d){ajax("POST.JSON",a,b,c,d);return this}})})();
//base.core.js
$.bindModule=function(h,j,k){if(typeof j!="object"){k=j;j=h;h=0}var l=h||this;$.each(j||{},function(f,g){g&&g.js&&$.each(f.split(" "),function(i,c){if(l[c])return;var d=[];var e=l[c]=function(){var a=this,arg=arguments;d.push(arg);if(e.autoLoaded==1)return;e.autoLoaded=1;var b=window.setTimeout(function(){e.autoLoaded=0},1000);g.css&&$.loadCss(g.css,k);$.loadJS(g.js,function(){b&&window.clearTimeout(b);/*if(l[c]===e){window.console&&window.console.log("方法"+c+"在"+g.js+"中未被定义！自动加载模块处理失败！");l[c]=$.noop;return}*/for(var n=d.length,i=0;i<n;i++)l[c].apply(a,d[i]);d.length=0},k)}})});return this};
})(window, jQuery);

/*
 * 核心对象Core
 */
var Core = (function(window, $, undefined){
//"use strict";
/*
 * 时间检测对象，可以覆盖serverInitTime以读取服务器时间
 */
var Time = {
	connectTime : window.performance && window.performance.timing ? window.performance.timing.connectStart || 0 : 0,
	serverInitTime : +new Date(),
	localInitTime : +new Date(),
	getServerTime : function(){
		//如果connectTime存在并且比serverTime早，则修正serverTime
		var pageLoadTime = this.localInitTime - this.connectTime, serverTime = this.serverInitTime + (+new Date()) - this.localInitTime;
		return new Date( this.connectTime > 0 && pageLoadTime > 0 ? serverTime + pageLoadTime : serverTime );
	}
};

//注册jquery自加载模块，注册过程可以在获得cdn路径后立即执行
$.bindModule({
	//"dialog" : {js:"/js2/dialog.js",css:"/css2/dialog.css"}
	//"scrollWhenNeed" : {js:"/js2/easyTools/scroll.js"},
	//"easyEvents" : {js:"/js2/easyTools/event.js"}
});
//jquery.fn
$.bindModule($.fn, {
	"disableSelection enableSelection disableDarg enableDarg disableRightClick enableRightClick disableIME enableIME setControlEffect bindTab" : {js:"/js2/easyTools/tools.js"},
	"bindDrag" : {js:"/js2/easyTools/drag.js"}
	/*"disableSelection enableSelection disableDarg enableDarg disableRightClick enableRightClick disableIME enableIME setControlEffect bindTab" : {js:"js2/easyTools/tools.js"},
	"bindDrag" : {js:"js2/easyTools/drag.js"},
	"scrollGrid xScrollGrid" : {js:"js2/easyTools/scroll.js"},
	"easyEvents" : {js:"js2/easyTools/event.js"}*/
});

var Core = {
	/*
	 * UI版本
	 */
	version : "1.1",
	
	/*
	 * 内存强制回收函数引用
	 */
	GC : window.CollectGarbage || $.noop,
	
	/*
	 * 日志输出接口
	 * 如果是ftl调试模式，则自动打开调试接口
	 */
	log : (/\.ftl/i.test(window.location.pathname) || $.getPara("debugger")) && window.console ? window.console.log || $.noop : $.noop,
	
	/*
	 * 当前时间
	 * 初始化为本地时间，如果后台给出服务器时间后，则替换
	 */
	serverTime : function(){ return Time.getServerTime() },
	
	/*
	 * 自动加载模块注册
	 */
	bindModule : function(ops){
		$.bindModule(this, ops, this.cdnUrl);
		return this;
	},
		
	/*
	 * 自加载模块配置对象
	 */
	//autoModule : {},
	
	/*
	 * 业务配置信息对象/缓存对象，由页面自定设置
	 */
	cdnUrl : "", //常规下的默认值，以保证cdnUrl随时可用
	navConfig : {
		appName : "网易用户中心",
		appID : "urs"
	},
	
	/*
	 * 顶部工具条初始化函数
	 * cdn			cdn路径配置
	 * userId		当前登录的用户名全称
	 * versionId	当前cdn的版本号
	 * serverTime	当前服务器时间（毫秒）
	 */
	configInit : function( cdn, userId, versionId, serverTime ){
		//保存变量
		this.cdnUrl = cdn;
		this.version = versionId || this.version;
		if(serverTime)Time.serverInitTime = +serverTime;
		//如果是用户私有页面，则修改退出登录的返回url地址到首页
		//要求私有js必须放在head内，否则config配置将在页面输出时无效
		if( this.userPage || this.privatePage ){
			this.navConfig.logoutUrl = "http://reg.163.com/Logout.jsp?username={username}&url="+ encodeURIComponent("http://"+ window.location.host);
		}
		//删除初始化方法
		delete this.configInit;
	},
	
	/*
	 * 快速初始化入口，在页面底部即被执行
	 * 2012-09-25 马超 删除quickInit修改为由fastInit方法调用
	 */
	fastInit : function(){
		//初始化工具条，防止navInit未被调用
		this.configInit && this.configInit(this.cdnUrl, "", +new Date(), "");
		
		//绑定事件
		if( this.eventWrap && this.events ) $(this.eventWrap).easyEvents(this.events, this);
		
		//其他快速初始化逻辑放在这里
		
		
		//调用其他快速初始化
		this.quickInit && this.quickInit();
		//删除
		delete this.fastInit;
	},

	/*
	 * 初始化入口
	 */
	init : function(){
		//自定义模块加载
		if( this.autoModule ) this.bindModule( this.autoModule, this.cdnUrl );
		
		//各个页面独立的初始化任务
		this.myInit();
		
		//页面卸载以及尺寸变化
		this.unload != $.noop && $(window).unload($.proxy(this.unload, this));
		this.resize != $.noop && $(window).resize($.proxy(this.resize, this));
		this.beforeUnload != $.noop && $(window).bind("beforeunload", $.proxy(this.beforeUnload, this));
		//主动激发一次resize事件
		window.setTimeout(function(){$(window).resize()},0);
		
		//删除过期成员
		delete this.init;
		this.quickInit && delete this.quickInit;
		//内存垃圾回收
		this.GC();
	},
	
	//各个页面独立的初始化任务，需要在页面中覆盖
	myInit : $.noop,
	//页面卸载任务
	unload : $.noop,
	//页面尺寸变化
	resize : $.noop,
	//窗口关闭前处理
	beforeUnload : $.noop,

	/*
	 * 字符串转化为json对象，适用小数据量转化
	 * 此处不对字符串进行安全检查，也不处理前后空格
	 * 将\/Date(...)\/格式的外层斜线去掉以供js使用
	 * $.parseJSON 也可进行json格式化，但是对输入检验比较严格，可以根据实际情况选择使用
	 */
	parseJSON : function(data){
		data = data.replace(/("|')\\?\/Date\((-?[0-9+]+)\)\\?\/\1/g, "new Date($2)");
		return (new Function("return " + data))();
	},
	
	/*
	 * 发送ajax请求
	 * get/post参数：
	 * url		[必选]发送的请求url
	 * data		[可选]发送的数据
	 * callback	[可选]ajax回调，接受两个参数： errCode / data
	 * key		[可选]并发控制锁，如果key是一个以 @开头的字符串，则表示去掉上一个同类型的ajax，否则就取消本次ajax除非上一个ajax完成
	 *
	 * getJSON/postJSON参数同上，只是callback增加一个错误码 3（json数据格式化失败），如果格式化成功，则data是格式化好的json数据
	 */
	get : $.get2,
	post : $.post2,
	getJSON : $.getJSON2,
	postJSON : $.postJSON2,
	/*
	 * 加载javascript/css
	 * loadJS 参数：
	 * url		[必选]要加载的资源，可以字符串或数组
	 * chkFn	[可选]资源加载判断函数
	 * callback	[可选]资源加载完毕的回调
	 * charset	[可选]资源加载类型
	 * cdnURL	[可选]资源目录
	 *
	 * loadCss 参数：
	 * url		[必选]要加载的资源，可以字符串或数组
	 * cdnURL	[可选]资源目录
	 */
	loadJS : $.loadJS,
	loadCss : $.loadCss,
	loadCdnJS : function(){ return this.loadJS.apply(this, Array.prototype.push.call(arguments, this.cdnUrl)); },
	loadCdnCss : function(url){ return this.loadCss(url, this.cdnUrl); }
};

//引用到window
return Core;
})(window, jQuery);

/*
 * 卸载事件
 */
jQuery(window).unload(function(){
	document.oncontextmenu = null;
	window.Core = null;
	window.onload = null;
	window.onresize = null;
	window.onunload = null;
	window.onerror = null;
	window.CollectGarbage && window.CollectGarbage();
});

//绑定页面完成监听
jQuery(document).ready(function(){ Core.init(); });