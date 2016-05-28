(function(window,$,Core,undefined){

var document = window.document, easyNav = window.easyNav,
setTimeout = window.setTimeout, clearTimeout = window.clearTimeout;

//让页面垂直居中
setPageVerticalMiddle();

// 给jQuery的animation函数增加一种easing效果
jQuery.extend(jQuery.easing,{
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
});

$.extend(Core,{
	myInit : function(){
		//公用
		Core.commonInit();
		var $username = $("#username"),
		$password = $("#password"),
		urlParamUsername = $.getUrlPara("username");
		//tips
		$.jtip("strong[tip]");
		//tab切换
		$(".m-tab").bindTab(tabBindHandler,null,"li","z-on","rel");
		//自动补全
		$username.autoFill(["@163.com","@126.com","@yeah.net","@vip.163.com","@vip.126.com","@popo.163.com","@188.com","@vip.188.com","@yahoo.com","@sina.com"]);
		//输入框非空失焦则自动补全
		$username.bind("blur", function(){
			$username.val() && $username.val().indexOf("@")===-1 && $username.val($("#autoCompleteList .autoListItemHover").eq(0).attr("title"));
		});
		//退出登录表单自动记忆用户名
		var username = $.getUrlPara("errorUsername");
		if(typeof username === "object" || (typeof username === "string" && username === "")){
			var pInfoCookieVal = $.cookie("P_INFO"),
			pInfoCookieValArr = pInfoCookieVal ? pInfoCookieVal.split("|") : [];
			if(pInfoCookieValArr.length >= 9){
				username = pInfoCookieValArr[8];	
			}else if(pInfoCookieValArr.length > 0){
				username = pInfoCookieValArr[0];	
			}
		}
		if(typeof username === "string" && username !== ""){
			username = (username.indexOf("@") === -1) ? username+"@163.com" : username;
			$username.val(username);
			setTimeout(function(){$password.trigger("focus");}, 500);
		}else{
			setTimeout(function(){$username.trigger("focus");}, 500);
		}
		//登录按钮绑定事件
		$("#loginBtn").bind("click", function(e){
			e.preventDefault();
			var	usrIsChecked = checkUsr($username.val()),
			pwdIsChecked = checkPwd($password.val());
			if(!usrIsChecked){
				$username.focus();
				checkAlert("err", "请您输入正确的用户名");
				return;
			}
			if(!pwdIsChecked){
				$password.focus();
				checkAlert("err", "请您输入密码");
				return;
			}
			
			$.ajax({
				url:"/click.jsp?click_in=Login&v=" + new Date().getTime() + "&click_count_spec=userLoginQuery&_ahref=&_at=",
				timeout:1000,
				complete:function(){
					$("#fLogin").submit();
				}
			});
		});
		//背景轮播 date update:2014-09-04 废弃背景轮播
		//shiftBg();
		//新手指引
		learnerTip();
	}
});

/* 二维码登录 */
(function(){
	
	var $loginQrCode = $("#loginQrCode"),
	$reflashOrBtn = $("#loginQrCodeContainer .reflashOrBtn").eq(0),
	$msg = $("#qrBox>p").eq(0),
	$tip = $("#qrBox>.u-tips4").eq(0),
	$loginQrCodeCover = $(".loginQrCodeCover"),
	$loginQrCodeInfor = $(".loginQrCodeInfor");
	
	$loginQrCode.qrLogin({
		scanIsComplete: function(){
			!$msg.hasClass("f-dn") && $msg.addClass("f-dn");
			$tip.attr("class", "u-tips4 u-tips4-ok").find("span").html("<strong>成功扫描！</strong><br />请在手机点击 <i class='z-hl'>确认</i> 以登录。");	
		},
		confirmLogin: function(data){
			$("#ticket").val(data.ticket);
			$("#codeLoginForm").submit();
		},
		codeLose: function(){
			$msg.removeClass("f-dn");
			!$tip.hasClass("f-dn") && $tip.addClass("f-dn");
			$loginQrCodeCover.show();
			$loginQrCodeInfor.show();
			$("#codeTrigger").hide();
		}
	});
	
	$reflashOrBtn.click(function(e){
		$loginQrCode.updateQrLogin();
		$msg.removeClass("f-dn");
		$tip.attr("class","u-tips4 f-dn");
		$loginQrCodeCover.hide();
		$loginQrCodeInfor.hide();
		e.preventDefault();
	});
	
})();


/* 普通登录相关函数
 * 错误处理checkAlert 
 * 校验用户名checkUsr
 * 校验密码checkPwd
 */
function checkAlert(type, msg){
	$("#checkAlert").find(".u-tips").show().attr("class","u-tips u-tips-"+type).find("span").text(msg);
}
function checkUsr(usr){

	//非法字符返回false
	var forbiddenChars = ["<",">","(",")"];
	for(var i=0,len=forbiddenChars.length; i<len; i++){
		if(usr.indexOf(forbiddenChars[i])>=0){
			return false;
		}
	}

	var pos = usr.indexOf("@");
	if(pos === -1)
		return usr.length>0;
	else{
		var ssn = usr.substring(0,pos);
		return ssn.length>0;
	}
}
function checkPwd(pwd){
	return pwd.length>0 && pwd.length<=20;
}

/* tab切换
 * 如果是二维码登录，则重新获取id，打开轮询，否则关掉轮询定时器
 */
function tabBindHandler(ctx){
	var $activeCtx = $(ctx);
	if($activeCtx.attr("id") === "loginByCode"){
		$(".reflashOrBtn").trigger("click");
		setCodeTriggerPosition();
	}else{
		$("#loginQrCode").stopPolling();
		$("#codeTrigger").hide();
	}
}

// 定位#codeTrigger
function setCodeTriggerPosition(){
	var $loginQrCode = $("#loginQrCode"),
	offset = $loginQrCode.offset();
	$("#codeTrigger").css({ 
		"width":$loginQrCode.width()+"px", 
		"height":$loginQrCode.height()+"px",
		"top":offset.top+"px",
		"left":offset.left+"px"
	});
}

$(window).bind("resize", function(){
	if($("#loginByCode").css("display")!=="none"){
		setCodeTriggerPosition();
	}	
})

/* 页面垂直居中
 * 如果页面高度小于窗口高度，则垂直居中对齐，否则顶部对齐
 */
function setPageVerticalMiddle(){
	var $window = $(window),
	$body = $(document.body),
	$doc = $(".g-doc").eq(0),
	docHeight = $doc.outerHeight();
	$(window).bind("resize", function(){
		var offset = ($window.height()-docHeight)/2;
		$body.css("padding-top",(offset>0?offset:0)+"px");
		setTimeout(function(){$doc.css("visibility","visible");},200);
	})
}

/* 背景轮播
 * 
 */
function shiftBg(){
	var $bgs = $("#advList>a"),
	bgIdx = Math.floor($bgs.length*Math.random());
	
	if($bgs.length <= 1){
		$("#advListCtl").hide();
		$bgs.eq(bgIdx).show();
		return;
	}
	
	$bgs.each(function(){
		$(this).hide();	
	})
	$bgs.eq(bgIdx).show();
	
	$("#advListCtl").delegate("span", "click", function(){
		var $this = $(this);
		if($this.hasClass("leftCtl")){
			$bgs.eq(bgIdx).hide();
			bgIdx = bgIdx>0 ? bgIdx-1 : $bgs.length-1;
			$bgs.eq(bgIdx).show();
		}else if($this.hasClass("rightCtl")){
			$bgs.eq(bgIdx).hide();
			bgIdx = bgIdx<$bgs.length-1 ? bgIdx+1 : 0;
			$bgs.eq(bgIdx).show();
		}
	})	
}

/* 新手指引
 *
 */
function learnerTip(){
	var timer=null, lazySec = 500, 
	timer2=null, lazySec2 = 3000, curIdx = 0, maxIdx = 2,
	timer3=null, lazySec3 = 200,
	$loginQrCode = $("#loginQrCode"),
	$learnerTip = $("#learnerTip"),
	$codeTrigger = $("#codeTrigger"),
	$learnerTipCover = $("#learnerTipCover"),
	$marks = $("#learnerTipMarks>li"),
	$lists = $("#learnerTipLists>li"),
	clearTimer = function(){
		if(typeof timer === "number"){
			clearInterval(timer);
			timer = null;	
		}
	},
	clearTimer2 = function(){
		if(typeof timer2 === "number"){
			clearInterval(timer2);
			timer2 = null;	
		}
	},
	clearTimer3 = function(){
		if(typeof timer3 === "number"){
			clearTimeout(timer3);
			timer3 = null;	
		}
	},
	showLearnerTip = function(){
		clearTimer();
		clearTimer2();
		timer = setTimeout(function(){
			$(document.body).css({"overflow-x":"hidden"});
			$learnerTipCover.show().stop().animate({opacity:"0.63"}, "fast", function(){
				var offset = $loginQrCode.offset();
				$learnerTip.css({"top":(offset.top-150)+"px", "left":offset.left+"px"}).show().stop().animate({marginLeft:"-340px",opacity:"1"},1000,"easeOutBack");
				listsScrolling();
			});
		}, lazySec);
	},
	hideLearnerTip = function(e){
		var $toElement = $(e.relatedTarget);
		if($toElement.parents("#learnerTip").length || $toElement.attr("id") === "codeTrigger"){
			return;	
		}
		clearTimer();
		clearTimer2();
		$learnerTip.stop().animate({marginLeft:"0px",opacity:"0"}, function(){
			curIdx = 0;
			listsScroll(curIdx);
			
			$learnerTip.hide();
			$learnerTipCover.stop().animate({opacity:"0"}, "fast", function(){
				$learnerTipCover.hide();
			});
			$(document.body).css({"overflow-x":""});
		});
	},
	listsScroll = function(idx){
		$marks.removeClass("active").eq(idx).addClass("active");
		var $oldActiveEle = $lists.parent().find(".active");
		if($.isIE6 || $.isIE7){
			$oldActiveEle.removeClass("active");
			$lists.eq(idx).addClass("active");
		}else{
			$oldActiveEle.removeClass("active").addClass("oldActive").fadeOut(function(){
				$oldActiveEle.removeClass("oldActive");
			});
			$lists.eq(idx).addClass("active").fadeIn();
		}
	},
	listsScrolling = function(){
		clearTimer2();
		timer2 = setInterval(function(){
			curIdx = curIdx>=maxIdx ? 0 : curIdx+1;
			listsScroll(curIdx);
		}, lazySec2);
	};
	
	$learnerTip.css({"opacity":0});
	/*$(document)
	.delegate("#codeTrigger", "mouseenter", showLearnerTip)
	.delegate("#codeTrigger", "mouseleave", hideLearnerTip)
	.delegate("#learnerTip", "mouseleave", hideLearnerTip);*/
	$codeTrigger.bind("mouseenter", showLearnerTip);
	$codeTrigger.bind("mouseleave", hideLearnerTip);
	$learnerTip.bind("mouseleave", hideLearnerTip);
	
	$(document).delegate("#learnerTipMarks li[class!='active']", "mouseenter", function(){
		var $this = $(this);
		clearTimer2();
		clearTimer3();
		timer3 = setTimeout(function(){
			curIdx = $this.attr("data-idx")-0;
			listsScroll(curIdx);
			listsScrolling();
		},lazySec3);
	});
	
	$(document).delegate(".reflashOrBtn", "click", function(e){
		$codeTrigger.show();
	});
}

})(window,jQuery,Core);