<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/easyui/easyui.css">   
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/easyui/icon.css">   
<script type="text/javascript" src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="https://www.jeasyui.com/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/validate.js"></script>
</head>
<body>
	数字          <input name="number"    class="easyui-numberbox" data-options="min:0,max:500,precision:1,prefix:'a',suffix:'b'"/><br/>
	电话/手机<input name="mobile"  class="easyui-textbox"   data-options="validType:'telOrMobile'"/><br/>
	最短长度  <input name="length1" class="easyui-textbox"   data-options="validType:'minLength[5]'"/><br/>
	最长长度  <input name="length2" class="easyui-textbox"   data-options="validType:'maxLength[10]'"/><br/>
	长度范围  <input name="length3" class="easyui-textbox"   data-options="validType:'length[5,10]'"/><br/>
	多行输入 <input name="bz"       class="easyui-textbox" data-options="multiline:true,validType:['maxLength[250]'],required:false,width:550,height:70"/><br/>
	日期1  <input name="date1" class="easyui-datebox"      data-options="editable:false,required:false,icons:[{iconCls:'icon-clear',handler : function(e) { $(e.data.target).datebox('clear'); }}]"/><br/>
	日期2 <input name="date2" class="easyui-datetimebox"   data-options="editable:false,required:false,showSeconds: false" />
	下拉框 <input class="easyui-combobox" name="mj"   
					data-options="valueField:'code',
							textField:'name',
							data:[
								{'code':'a','name':'a'},
							    {'code':'b','name':'b'},
								{'code':'c','name':'c'}
							],
							editable:true,
							panelHeight:80,
							icons:[{iconCls:'icon-clear',handler : function(e) { $(e.data.target).combobox('clear'); }}]" />
	<div class="easyui-mutiuploadbox" style="width:550px;height:100px"  border="true" boxBorder="false" boxHeight="30" isPreview="false"/>
	按钮<a id="add"   class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-ok'">新增</a>
	按钮弹窗<a id="addwin" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-add'">弹窗</a>
	
	
	
	<script type="text/javascript">
		function showMsg(msg){//提出公用方法
			$.messager.show({
				msg : msg,
				title : "系统提示"
			});
		}
		
		$("#addwin").bind("click",function(){
			var win = $("<div id='win'></div>").window({
				title : "新增",
				width : 1000,
				height: 243,
			  //href :URL.formWin,
				onLoad : function(){
					//closeLoadingDiv();
				},
				onClose : function(){
					win.window('destroy');
				}
			});
		});
		
		
		$("#add").bind("click",function(){
			$.messager.confirm("提示","欧克欧克",function(r){
				if(r){
					$.messager.alert("提示","点击确认");
					showMsg("确认");
				}else{
					$.messager.alert("提示","点击否认");
					showMsg("否认");
				}
			});
		});
	</script>
</body>
</html>