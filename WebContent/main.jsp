<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ include file = "head.jsp" %>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/index.css">   
<script type="text/javascript" src="<%=request.getContextPath()%>/js/main1.js"></script>
<title>首页面</title>
</head>
<body>
	<div id="indexLayout" class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north',collapsible:false,hideCollapsedContent:false" data-id="head" style="height:45px;overflow:hidden">
		
		</div>
		<!-- 左菜单 -->
		<div class="indexLeft" data-id="leftmenu" style="width:190px;overflow:auto;" data-options="region:'west',split:false,collapsible:false,style:{textAlign:'left'}">
			<ul id="indexleftmenutree"></ul>
		</div>
		<div data-options="region:'center',split:true"><!--  -->
			<div id="mainTabs" class="easyui-tabs" data-options="toolPosition:'right',fit:true,border:false">
			</div>
		</div>
	</div>

	<div id="tab-tools" class="easyui-menu" style="width:100px;">
		<div id="1" iconCls="icon-page-refresh">刷新1</div>
		<div class="menu-sep"></div>
		<div id="2" iconCls="icon-close">关闭当前标签</div>
		<div id="3" iconCls="icon-close">关闭非当前标签</div>
	</div>	
</body>
</html>