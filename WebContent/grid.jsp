<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>dataGrid</title>
<%@ include file = "head.jsp" %>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/grid.js"></script>
</head>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'west',border:true" title="菜单" style="width:200px;">
					<ul class="easyui-tree">
			<li>
				<span>My Documents</span>
				<ul>
					<li data-options="state:'closed'">
						<span>Photos</span>
						<ul>
							<li>
								<span>Friend</span>
							</li>
							<li>
								<span>Wife</span>
							</li>
							<li>
								<span>Company</span>
							</li>
						</ul>
					</li>
					<li>
						<span>Program Files</span>
						<ul>
							<li>Intel</li>
							<li>Java</li>
							<li>Microsoft Office</li>
							<li>Games</li>
						</ul>
					</li>
					<li>index.html</li>
					<li>about.html</li>
					<li>welcome.html</li>
				</ul>
			</li>
		</ul>
			
		</div>
		<div data-options="region:'center',border:false" title="">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'north',border:false" title="查询条件" style="height:90px">
					<div style="width: 970px;">
						<form id="qf">
							<table>
								<tr>
									<td >AA：</td>
									<td><input name="aa" class="easyui-textbox" /></td>
									<td >BB：</td>
									<td><input name="bb" class="easyui-datebox" data-options="editable:false,formatter:formatterDateBox"></input></td>
									<td >CC：</td>
									<td><input name="cc" class="easyui-datebox" data-options="editable:false,formatter:formatterDateBox"></input></td>
									<td>
										<a id="query" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-zoom'">查询</a>
									</td>
								</tr>
								<tr>
									<td>DD：</td>
									<td><input name="dd" class="easyui-textbox" /></td>
									<td>EE：</td>
									<td colspan="3"><input name="ee" class="easyui-textbox" /></td>
									<td>
										<a id="clear" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-cross'">重置</a>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div data-options="region:'center',border:false" title="数据列表">
					<table id="grid" toolbar="#gridbar"></table>
					<div id="gridbar">
						<div style="padding: 2px">
							<a id="addBtn"    class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-add'">新增</a>
							<a id="updateBtn" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-page_edit'">查看/更新</a>
							<a id="delBtn"    class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-delete'">删除</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>