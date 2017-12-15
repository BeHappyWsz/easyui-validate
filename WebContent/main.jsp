<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%@ include file = "head.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/main.js"></script>
<title>首页面</title>
</head>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north',collapsible:false,hideCollapsedContent:false" data-id="head" style="height:45px;overflow:hidden">
		
		</div>
		<!-- 左侧菜单 -->
		<div data-id="leftmenu" style="width:190px;overflow:auto;" data-options="region:'west',split:false,collapsible:false,style:{textAlign:'left'}">
			<ul id="menutree"></ul>
		</div>
		<div data-options="region:'center',split:true"><!--  -->
			<div id="mainTabs" class="easyui-tabs" data-options="toolPosition:'right',fit:true,border:false">
				<div title="主页">默认一个主页面tab</div>
			</div>
		</div>
	</div>

    <!-- 以下为tabs右击事件 -->
	<div id="tab-tools" class="easyui-menu" style="width:100px;">
		<div id="1" data-options="iconCls:'icon-arrow_refresh'">刷新</div>
		<div class="menu-sep"></div>
		<div id="2" data-options="iconCls:'icon-cross'">关闭当前标签</div>
		<div id="3" data-options="iconCls:'icon-cross'">关闭非当前标签</div>
		<div class="menu-sep"></div>
		<div id="4" data-options="iconCls:'icon-cross'">关闭左侧标签</div>
		<div id="5" data-options="iconCls:'icon-cross'">关闭右侧标签</div>
		<div class="menu-sep"></div>
		<div id="6" iconCls="icon-cancel">关闭所有标签</div><!-- 也可这样设置图标 -->
	</div>	
</body>
</html>