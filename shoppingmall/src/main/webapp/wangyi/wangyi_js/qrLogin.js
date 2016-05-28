/*
 * 易信二维码登录组件
 *
 * [Depend On]
 * jquery 1.4.2+
 *
 * [Change Log]
 * 2014-01-17 周卿 创建
 *
 * [可配置参数]
 * product: 产品号，需要URS开通相关权限才能使用，开通权限请联系 董海疆(hjdong@corp.netease.com)
 * usage: 二维码使用场景 0:WEB页面 1:客户端
 * size: 二维码尺寸，宽高一样，单位px
 * format: 二维码图片格式(目前支持jpg, jpeg, png)
 * pollingSec: 每隔多少毫秒轮询一次
 * maxPollingTimes: 轮询次数，达到次数后会停止轮询
 * completePollingTimes: 扫描完成后更新的轮询次数，达到次数后停止轮询
 * confirmLogin: 用户确认登录触发的回调函数
 * scanIsComplete: 扫描完成，等待用户确认触发的回调函数
 * codeLose: 二维码失效、轮询超过限制触发的回调函数 
 */

(function(window, $, undefined){
var document = window.document,
setTimeout = window.setTimeout,
clearTimeout = window.clearTimeout,

defaultOptions = {
	product: "urs",
	usage: 0,
	size: 188,
	format: "jpeg",
	pollingSec: 2000,
	maxPollingTimes: 150,
	completePollingTimes: 60,
	confirmLogin: function(){
		alert("用户已确认，请执行登录代码！");
	},
	scanIsComplete: function(){
		alert("扫描完成，等待用户确认！");
	},
	codeLose: function(){
		alert("二维码失效！");	
	}
},

// 用户配置参数
_myOptions = {},

// 服务对象，只能是img标签
$target = null,

// 轮询定时器引用
pollingTimer = null,

// 轮询次数
pollingTimes = 0,

// 轮询是否第一次遇到409（完成扫描，等待确认的状态码）
isFirstCompleteScan = true,

// 协议，后台暂时只支持http
protocol = /^https:\/\//.test(window.location.href) ? "https" : "http",

// 是否URS域，其他域要跨域，接口不同
isURSDomain = /^(http|https):\/\/reg\.163\.com(\/|\b)/.test(window.location.href),

// 各种数据源
getCodeIdURL = protocol+"://reg.163.com/services/getqrcodeid",
getCodeURL = protocol+"://reg.163.com/services/getUrlQrcode",
getStatusURL = isURSDomain 
			 ? protocol+"://reg.163.com/services/qrcodeauth"
			 : protocol+"://q.reg.163.com/services/ngxqrcodeauthstatus",
getAuthURL = protocol+"://reg.163.com/services/qrcodeauth",

// 获取二维码ID
getCodeId = function(callback){
	/*var params = [
		"?product=", _myOptions.product,
		"&usage=", _myOptions.usage,
		(isURSDomain ? "" : "&callback=?")*/
	var params = [
		"?product=", _myOptions.product,
		"&usage=", _myOptions.usage,
		"&callback=?"
	].join("");
	$.getJSON(getCodeIdURL+params, function(data){
		if(data.retCode-0 === 200){
			var qrId = eval("("+data.content+")").l.i;
			if(typeof callback === "function"){
				callback(qrId);
			}
		}else{
			// 错误状态未处理	
		}
	});
},

// 获取轮询状态
getQrStatus = function(qrId, callback){
	var params = [
		"?uuid=", qrId,
		"&product=", _myOptions.product,
		(isURSDomain ? "" : "&callback=?")
	].join("");
	$.getJSON(getStatusURL+params, function(data){
		if(typeof callback === "function"){
			callback(data);
		}
	});
},

// 
getAuth = function(qrId, callback){
	var params = [
		"?uuid=", qrId,
		"&product=", _myOptions.product,
		"&callback=?"
	].join("");
	$.getJSON(getAuthURL+params, function(data){
		if(typeof callback === "function"){
			callback(data);
		}
	});
},

// 轮询处理
qrPolling = function(qrId){
	pollingTimer = setTimeout(function(){
		getQrStatus(qrId, function(data){
			switch(data.retCode-0){
				case 200:
					if(isURSDomain){
						_myOptions.confirmLogin(data);
					}else{
						getAuth(qrId, function(data){
							_myOptions.confirmLogin(data);
						});	
					}
					break;
				case 408:
					(--pollingTimes>0) && qrPolling(qrId);
					break;
				case 409:
					if(typeof _myOptions.scanIsComplete === "function"){
						_myOptions.scanIsComplete();
					}
					if(isFirstCompleteScan){
						isFirstCompleteScan = false;
						pollingTimes = _myOptions.completePollingTimes;
					}
					(--pollingTimes>0) && qrPolling(qrId);
					break;
				default:
					if(typeof _myOptions.codeLose === "function"){
						_myOptions.codeLose();
					}
					break;
			}
			if(pollingTimes === 0){
				if(typeof _myOptions.codeLose === "function"){
					_myOptions.codeLose();
				}
			}
		});
	}, _myOptions.pollingSec);
},

// 更新二维码，重新轮询
updateQrLogin = function(){
	pollingTimes = _myOptions.maxPollingTimes;
	isFirstCompleteScan = true;
	getCodeId(function(qrId){
		var params = [
			"?uuid=", qrId,
			"&size=", _myOptions.size,
			"&format=", _myOptions.format
		].join("");
		// $this是否为img元素未容错
		$target.attr("src", getCodeURL+params);
		qrPolling(qrId);
	});
	return $target;
},

stopPolling = function(){
	clearTimeout(pollingTimer);
	pollingTimer = null;
	return $target;
},

qrLogin = function(myOptions){
	$target = $(this);
	_myOptions = $.extend(defaultOptions, myOptions);
	return $target;
};

/* 用户接口，映射到$.fn */

// 第一次更新二维码前调用，主要是初始化一些参数
$.fn.qrLogin = qrLogin;
// 更新二维码
$.fn.updateQrLogin = updateQrLogin;
// 停止轮询
$.fn.stopPolling = stopPolling;

})(window, jQuery);