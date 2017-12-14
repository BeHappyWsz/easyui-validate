/**
 * grid的选择校验
 * 
 * @param {}
 *            grid
 */
function gridSelectedValid(grid) {
	var row = grid.datagrid("getSelected");
	if (row != null) {
		return row;
	} else {
		$.messager.alert("提示", "无选择数据");
		return false;
	}
}

/**
 * grid的勾选校验
 */
function gridCheckedValid(grid) {
	var rows = grid.datagrid("getChecked");
	
	if (rows.length > 0) {
		return $.map(rows, function(n) {
			return n.id;
		}).join(",");
	} else {
		$.messager.alert("提示", "无勾选数据");
		return false;
	}
}
/**
 * grid的勾选校验
 */
function gridChecked(grid) {
	var rows = grid.datagrid("getChecked");
	if (rows.length > 0) {
		return $.map(rows, function(n) {
			return n.lczt;
		}).join(",");
	}else{
		$.messager.alert("提示", "您尚未勾选数据！");
		return false;
	}
}
function gridCheck(grid) {
	var rows = grid.datagrid("getChecked");
	if (rows.length > 0) {
		return $.map(rows, function(n) {
			return n.sfyd;
		}).join(",");
	}else{
		$.messager.alert("提示", "您尚未勾选数据！");
		return false;
	}
}
/**
 * 将对象类型的参数构造成url跳转的字符串
 */
function createUrlParamStr(paramObj) {
	var str = "?_=";
	for ( var p in paramObj) {
		str += "&" + p + "=" + paramObj[p];
	}
	return str;
}

/**
 * 关闭遮罩层
 */
function closeLoadingDiv() {
	$('div[data-id=loading]').fadeOut('normal', function() {
		$(this).remove();
	});
}

/**
 * 通用删除
 */
function commonBatchDelete(grid, url, modelName) {
	var ids = gridCheckedValid(grid);
	if (!ids) {
		return;
	}
	$.messager.confirm("删除确认", Msg.delconfirm, function(r) {
		if (r) {
			$.ajax({
				type : "post",
				url : url,
				data : {
					ids : ids
				},
				success : function(data) {
					/** 如果删除成功，刷新grid数据* */
					if (data.success) {
						$.messager.progress("close");
						$("#" + modelName + "_grid").datagrid("reload");
						$.messager.alert("系统提示：", Msg.delSuc);
					}
				}
			});
		}
	});
}

/**
 * 通用删除，返回提示自定义
 * @param grid
 * @param url
 * @param modelName
 */
function batchDelete(grid, url, modelName) {
	var ids = gridCheckedValid(grid);
	if (!ids) {
		return;
	}
	$.messager.confirm("删除确认", Msg.delconfirm, function(r) {
		if (r) {
			$.ajax({
				type : "post",
				url : url,
				data : {
					ids : ids
				},
				success : function(data) {
					/** 如果删除成功，刷新grid数据* */
					//console.info(data.success);
					if (data.success) {
						$.messager.progress("close");
						$("#" + modelName + "_grid").datagrid("reload");
						$.messager.alert("系统提示：", "删除成功!");
					}else{
						$.messager.progress("close");
						$("#" + modelName + "_grid").datagrid("reload");
						$.messager.alert("系统提示：", data.returnMsg);
					}
				}
			});
		}
	});
}

/**
 * 通用加载数据
 */
function commonformLoadData(id, url, modelName) {
	$.ajax({
		type : "post",
		dataType : "json",
		url : url,
		data : {
			id : id
		},
		success : function(data) {
			$("#" + modelName + "_form").form("load", data);
		}
	});
}

function trim(s) {
	return s.replace(/^\s+|\s+$/g, "");
};

// 验证身份证号并获取出生日期
function getBirthdatByIdNo(iIdNo) {
	var tmpStr = "";
	iIdNo = trim(iIdNo);
	if (iIdNo.length == 15) {
		tmpStr = iIdNo.substring(6, 12);
		tmpStr = "19" + tmpStr;
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-"
				+ tmpStr.substring(6);
		return tmpStr;
	} else {
		tmpStr = iIdNo.substring(6, 14);
		tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-"
				+ tmpStr.substring(6);
		return tmpStr;
	}
}

//根据身份证号码获得性别
function getSexByIdNo(iIdNo) {
	var sex="";
	if (iIdNo.length == 15) {
		if(parseInt(iIdNo.substr(14, 1)) % 2 == 1){
			sex ="1";
		}
		else{
			sex ="2";
		}
	}else{
		if(parseInt(iIdNo.substr(16, 1)) % 2 == 1){
			sex ="1";
		}
		else{
			sex ="2";
		}
	}
	return sex;
}

//通过身份证ajax请求年龄
function ajaxFindAgeBySfz(sfz,textbox){
	$.ajax({
		url : ctx + "/jcxx/shtt/getInfoBySfz",
		type : "post",
		data : {
			sfz:sfz
		},
		success : function(data){
			if(data.success){
				textbox.numberbox("setValue",parseInt(data.data.age));
			}
		}
	});
}

//获取文件后缀名判断类型
function getLxByFileName(fileName) {
	var index1 = fileName.lastIndexOf(".");
	var index2 = fileName.length; 
	var postf = fileName.substring(index1,index2); 
	
	if(postf == ".docx" || postf == ".doc"){
		return "icon-standard-page-word";
	}else if(postf == ".xls" || postf == ".xlsx"){
		return "icon-standard-page-excel";
	}else if(postf == ".png" || postf == ".bmp" || postf ==".jpg" || postf == ".gif"){
		return "icon-standard-image";
	}else{
		return "icon-standard-folder";
	}
}
//特定列进行排序
function sortByDate(a,b){
	var aa = new Date(a.replace(/-/,"/")) ;
	var bb = new Date(b.replace(/-/,"/")) ;
	return aa > bb ? 1 : (aa == bb ? 0 : -1);
}