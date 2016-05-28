<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>product_UP</title>
</head>
<body>
	<div align="center">
		<tr>
			<h2 style="color:green;">
				<td>商品信息</td>
			</h2>

		</tr>

	</div>
	<hr>
	<div>
	<form:form action=""  enctype="application/x-www-form-urlencoded">
			<table>
				<tr>
					<td>商品名称:</td>
					<td><input name="productName" id="productName" type="text"
						onblur="validate(this)" /><span style="color: red;">输入的字数大于2小于80</span></td>
					
				</tr>
			
				<tr>
					<td>商品类型:</td>
					<td><select id="productType" name="productType">
							<option>数码</option>
							<option>水果</option>
							<option>图书</option>
					</select></td>

				</tr>
			
				<tr>
					<td>商品图片:</td>
					<td><input type="file" id="productPicture" multiple="multiple"   
						name="productPicture" onblur="validate(this)"   ></td>
					<td style="color: red;">输入的字数大于2小于80</td>
				</tr>
				<tr></tr>
				<tr>
					<td>到期时间:</td>
					<td><input name="overTime" id="overTime" type="number" />天</td>
					<td style="color: red;">输入的字数大于2小于80</td>
				</tr>
				<tr></tr>
				<tr>
					<td>详细描述:</td>
					<td><textarea name="describe" rows="30" cols="30" title=""
							id="describe"></textarea></td>

				</tr>
				<tr>
					<td></td>
					<td align="center"><button type="button" name="">提交</button>
					</td>
				</tr>
			</table>
		</form:form>
	</div>

</body>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/static/jquery/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
	var tag = false
	function validate(dom) {
		var name = $(dom).attr("name")
		var value = $(dom).val()
		var td   = $(dom).parent().next();
	
		if (name == "productName") {
			if (value.length<2 || value.length>80) {
				window.tag = false;
				$(td).show()
			} else {
				$(td).hide()
				window.tag = true;

			}
		}else if(name=="productPicture"){
			
		}

	}
</script>
</html>
