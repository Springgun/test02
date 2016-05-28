<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>hander</title>
</head>
<body>

	<div align="center">
		<tr>
			<h2 style="color: yellow">
				<td>用户信息管理</td>
			</h2>
		</tr>

	</div>
	<div align="right">
		<tr>
			<td style="color: blue">hi! ${sessionScope.user.userName}</td>
			<td><a href="#">消息</a></td>
			<td style="color: black"><a href="#">[注销]</a> &nbsp;&nbsp;&nbsp;&nbsp;</td>

		</tr>


	</div>

</body>
</html>