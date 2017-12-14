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
		<div data-options="region:'west',border:true" title="部门管理" style="width:200px;">
			<ul id="txl_bmtree" class="easyui-tree"></ul>
		</div>
		<div data-options="region:'center',border:false" title="">
			<div class="easyui-layout" data-options="fit:true">
				<div data-options="region:'north',border:false" title="查询条件" style="height:90px">
					<div style="width: 970px;">
						<form id="qf">
							<table class="querytable">
								<tr>
									<td class="label">标题：</td>
									<td><input name="title" class="easyui-textbox" /></td>
									<td class="label">上传时间(起)：</td>
									<td><input name="scsj_s" class="easyui-datebox" data-options="editable:false"></input></td>
									<td class="label">上传时间(止)：</td>
									<td><input name="scsj_e" class="easyui-datebox" data-options="editable:false"></input></td>
									<td>
										<a id="query" class="easyui-linkbutton" data-options="plain:false,iconCls:'iconfont icon-standard-zoom'">查询</a>
									</td>
								</tr>
								<tr>
									<td class="label">文件类型：</td>
									<td><input name="scyh" class="easyui-textbox" /></td>
									<td class="label">上传用户：</td>
									<td colspan="3"><input name="scyh" class="easyui-textbox" /></td>
									<td>
										<a id="clear" class="easyui-linkbutton" data-options="plain:false,iconCls:'iconfont icon-standard-cross'">重置</a>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div data-options="region:'center',border:false" title="数据列表[双击查看详情]">
					<table id="grid" toolbar="#gridbar"></table>
					<div id="gridbar">
						<div style="padding: 2px">
							<a id="zlzx_clear" class="easyui-linkbutton" data-options="plain:false,iconCls:'iconfont icon-standard-cross'">重置</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>