/*
 * URS页面 / 周卿
 * URS公用业务代码
 * 
 * [Change Log]
 * 2013-07-29 周卿 创建
 * 2013-09-02 周卿 IOS5下的safari对label标签的for属性支持不好，做特殊处理。
 */
(function(window,$,Core,undefined){
	
var document = window.document, easyNav = window.easyNav,
	setTimeout = window.setTimeout, clearTimeout = window.clearTimeout;

$.extend(Core,{
	
	config : {
		iptFocClassName : "u-ipt-foc",
		hideClassName : "f-dn",
		tipsWarnClassName : "u-tips-warn",
		tipsOkClassName : "u-tips-ok",
		tipsErrClassName : "u-tips-err"
	},
	
	//验证码,返回一个对象,包含变换验证码的方法change
	checkCode : function(codeLen){
		var obj = {},
			v = (new Date().getTime()),
			getIdUrl = "/services/getid",
			getImgUrl = "/services/getimg?v="+v+"&id=",
			changeCodeCallback = function(res){
				$('#syscheckcode').attr('value',res);
				$('#checkCode').attr('src',getImgUrl+res);
			};
		if(codeLen){
			getIdUrl = "//reg.163.com/services/getid";
			getImgUrl = "//reg.163.com/services/getimg?v="+v+"&num="+codeLen+"&type=2&id=";
		}
		
		var changeCode = function(){
			$.ajax({
				type:"GET",
				url:getIdUrl,
				success:changeCodeCallback		   
			});	
		}
		changeCode();
		$(".m-ipt-code .u-btn-img-code,#checkCode").click(function(){
			changeCode();
		});
		obj.change = changeCode;
		return obj;
	},
	
	/* 此函数用于发送邮件 */
	sendEmail : function(retakeMethod, callback){
		$.ajax({
			url: "/resetpwd/sendMailForUser.do?retakeMethod="+retakeMethod,
			//url:"/ftl/testData2/reg/resendActivateMail.txt",
			success : function(data){
				if(typeof callback !== "function"){return;}
				var data = data.replace("\n",""),
				rtObj = {code:data, msg:""};
				if(data === "200"){
					rtObj.msg = "邮件发送成功，马上去邮箱看看！";
				}else if(data === "500"){
					rtObj.msg = "邮件发送失败，系统维护，请稍后再试！";	
				}else if(data === "501"){
					rtObj.msg = "邮件发送失败，超时！";
				}else if(data === "502"){
					rtObj.msg = "邮件发送失败，参数错误！";
				}else if(data === "503"){
					rtObj.msg = "邮件发送失败，尝试次数过多！";
				}else if(data === "504"){
					rtObj.msg = "邮件发送失败，用户帐号已经锁定！";
				}else{
					rtObj.msg = "系统错误！";	
				}
				callback(rtObj);	
			}
		});
	},
	
	/* 此函数用于向手机发送验证码
	 * opts.mobile string 手机号码
	 * opts.channel string
	 * opts.okHandler function 成功后回调
	 * opts.tooMuchHandler function 发送过于频繁的回调
	 * opts.errHandler function 系统错误的回调
	 */
	sendMessage : function(opts){
		var href = window.location.href,
			protocol = "http";
		if(href.indexOf("https") === 0){
			protocol = "https";
		};
		
		var opts = $.extend({}, opts);
		$.ajax({
			type:"POST",
			async:false,
			url:protocol + "://reg.163.com/services/sendsms",
			data:{username:opts.mobile, channel:opts.channel},
			success:function(msg){
				if(msg === '200\n'){
					if(typeof opts.okHandler === "function"){
						opts.okHandler();
					}
				}
				else if(msg == '501\n'){
					if(typeof opts.tooMuchHandler === "function"){
						opts.tooMuchHandler();
					}
				}
				else{
					if(typeof opts.errHandler === "function"){
						opts.errHandler();
					}
				}
			}
		});	   
	},
	
	//公用业务代码，在各页面的myInit里面执行
	commonInit : function(){
		
		//输入框焦点处理
		$(".u-ipt input").focus(function(){
			var $uIpt = $(this).parents(".u-ipt");
			if(!$uIpt.hasClass(Core.config.iptFocClassName)){
				$uIpt.addClass(Core.config.iptFocClassName);
			}
		}).blur(function(){
			var $uIpt = $(this).parents(".u-ipt");
			$uIpt.removeClass(Core.config.iptFocClassName);
		});
		
		//placeholder
		var $ipts = $(".u-ipt input");
		$ipts.length && $ipts.placeholder();
		
		// 广告close按钮
		$(".m-adv .u-advClose").click(function(){
			$(this).parents(".m-adv").hide();
		});
	},
	
	/*
	 * 校验后样式处理
	 * type string 样式种类
	 * $ipt jQuery Object 校验的input元素
	 * text string 校验后tips提示文本
	 */
	changeCheckStyle : function(type, $ipt, text){
		var text = text || "",
			$mIpt = $ipt.parents(".m-ipt"),
			//$uIpt = $mIpt.find(".u-ipt").not(".m-sel .u-ipt"),
			$uIpt = $mIpt.find(".u-ipt").eq(0),
			$uTips = $mIpt.find(".u-tips");
		$uIpt.attr("class","u-ipt");
		$uTips.attr("class","u-tips");
		$uTips.find("span").html(text);
		if(type === "ok"){
			!$uTips.hasClass("u-tips-ok") && $uTips.addClass("u-tips-ok");	
		}else if(type === "err"){
			!$uIpt.hasClass("u-ipt-err") && $uIpt.addClass("u-ipt-err");
			!$uTips.hasClass("u-tips-err") && $uTips.addClass("u-tips-err");
		}else if(type === "warn"){
			!$uIpt.hasClass("u-ipt-foc") && $uIpt.addClass("u-ipt-foc");
			text !== "" && !$uTips.hasClass("u-tips-warn") && $uTips.addClass("u-tips-warn");	
		}else{
			$uTips.attr("class","u-tips");
		}
	},
	
	changeCheckStyle2 : function(type, $tip, text){
		$tip.show().attr("class","u-tips u-tips-"+type).find("span").eq(0).text(text);
	}
});

/* 简单的模拟select组件
 * 带一个自定义事件ursSelect.change，select值改变时触发
*/
$.fn.ursSelect = function(){
	var	$this = this,
	showOptions = function(e){
		var $btn = $(this),
			$selOptions = $btn.parents(".m-sel").find(".selOptions");
		$selOptions.hasClass(Core.config.hideClassName) ? $selOptions.removeClass(Core.config.hideClassName) : $selOptions.addClass(Core.config.hideClassName);
		e.preventDefault();
	},
	hideOptions = function(e){
		var $tar = $(e.target);
		if(($tar.hasClass("u-btn-img-select") || $tar.parents(".u-btn-img-select")) && $tar.parents(".m-sel").get(0) === $this.get(0)){return;}
		var $selOptions = $this.find(".selOptions").not("."+Core.config.hideClassName);
		if($selOptions.length){
			$selOptions.addClass(Core.config.hideClassName)
		}
	}
	$this.find(".selInput .u-ipt input").focus(showOptions);
	$this.delegate(".selInput .u-btn","click", showOptions).delegate(".selOptions a","click",function(e){
		var $a = $(this),
			$mSel = $a.parents(".m-sel"),
			$uIpt = $mSel.find(".selInput"),
			$label = $uIpt.find("label"),
			$ipt = $uIpt.find("input"),
			$selOptions = $mSel.find(".selOptions");
		!$selOptions.hasClass(Core.config.hideClassName) && $selOptions.addClass(Core.config.hideClassName);
		!$label.hasClass(Core.config.hideClassName) && $label.addClass(Core.config.hideClassName); 
		$ipt.val($a.text());
		$this.trigger("ursSelect.change", {"$opt":$a, "val":$a.text()});
		e.preventDefault();
	});
	var $opts = $this.find(".selOptions a"),
		optsLen = $opts.length,
		idx = 0;
	$(document).click(hideOptions);
	return $this;
};

})(window,jQuery,Core);