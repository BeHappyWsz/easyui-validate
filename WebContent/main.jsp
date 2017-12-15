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
		<!-- 主要内容 -->
		<div data-options="region:'center',split:true"><!--  -->
			<div data-id="mainTabs" class="easyui-tabs" data-options="tools:'#tab-tools',toolPosition:'right',fit:true,border:false">
				
			</div>
		</div>
	</div>

	<!-- 模板开始 -->
	<div data-id="simpleweb-system-top-minitool">
		<div class="nav1">
			<div class="col right">
					<a data-action="refresh" href="javascript:void(0)" class="easyui-linkbutton" style="color: #36BDEF;"  data-options="plain:true,iconCls:'icon-standard-arrow-refresh'">刷新</a>
					<a href="javascript:void(0)"  data-action="usersetting" class="easyui-linkbutton"  style="color: #36BDEF;" data-options="iconCls:'icon-standard-user-edit',plain:true">用户设置</a>  
					<a href="javascript:void(0)" data-action="fullscreen"  class="easyui-linkbutton" style="color: #36BDEF;" data-options="iconCls:'icon-standard-arrow-out',plain:true">全屏切换</a>  
					<a href="javascript:void(0)" data-action="loginout"  class="easyui-linkbutton" style="color: #36BDEF;" data-options="iconCls:'icon-standard-door-out',plain:true">退出登录</a>  
			</div>
		</div>
	</div>


	<div id="tab-tools" style="width:100px;">
		<div name="refreshPanel" iconCls="icon-standard-arrow-refresh">刷新</div>
		<div class="menu-sep"></div>
		<div name="closeCurrent" iconCls="icon-standard-application-form-delete">关闭当前标签</div>
		<div name="closeNotCurrent" iconCls="icon-standard-cancel">关闭非当前标签</div>
		<div class="menu-sep"></div>
		<div name="closeLeft" iconCls="icon-standard-tab-close-left">关闭左侧标签</div>
		<div name="closeRight" iconCls="icon-standard-tab-close-right">关闭右侧标签</div>
		<div class="menu-sep"></div>
		<div name="closeAll" iconCls="icon-standard-cross">全部关闭</div>
	</div>	
	
	<div data-id="window_dialogbutton">
		<a data-action="save"  href="javascript:void(-1);" class="easyui-linkbutton" iconCls='icon-standard-page-save'>保存</a>  
		<a data-action="close" href="javascript:void(-1);" class="easyui-linkbutton" iconCls='icon-standard-cancel'>关闭</a> 
	</div>	
</body>
</html>