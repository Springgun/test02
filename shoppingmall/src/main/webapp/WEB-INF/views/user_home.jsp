<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>user_home</title>
</head>

<c:set var="ctp"  value="${pageContext.request.contextPath}"></c:set>
<frameset rows="85,*,40" frameborder="NO" noresize Borders="NO"
	framespacing="0">
	
	<frame name="topFrame" frameborder="NO" scrolling="NO" noresize
		Borders="NO" src="${ctp}/header" marginwidth="value"
		marginheight="value">
	
	<frameset rows="*" cols="180,*" border="0" noresize framespacing="2">
	
		<frame name="menu" src="${ctp}/menu" border="0"
			scrolling="auto" marginwidth="0" leftmargin="0" marginheight="0"
			APPLICATION="yes">
	
		<frame name="content" src="${ctp}/welcome" id="content"
			frameborder="no" marginwidth="0" marginheight="0" APPLICATION="yes">
	
	</frameset>
	
	<frame src="${ctp}/footer" name="#" frameborder="NO"
		scrolling="NO" noresize marginwidth="0" marginheight="0" Borders="NO">
		
</frameset>

</html>