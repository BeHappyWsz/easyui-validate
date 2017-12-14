$(function(){
	var URL = {
	};
	
	/** 模块名称* */
	var modelName = "demo";
	/** 主页列表* */
	var grid = $("#grid");
	
	/** 主页查询表单* */
	var queryForm = $("#qf");
	
	/** 渲染Grid* */
	renderGrid();
	
	/** 绑定Grid操作按钮方法* */
	bindGridToorBar();
	
	/** 绑定Grid操作按钮方法* */
	bindSearchBtns();
	
	function renderGrid(){
		grid.datagrid({
			url :URL.gridData,
			onDblClickRow : function(index,row) {
					openFormWin(row.id,row.userName);
			},
			frozenColumns :[[
				{field:"id",checkbox:true},
				{field:"a",title:"a",align:"left",halign:"center",width:150},
				{field:"b",title:"b",align:"left",halign:"center",width:350},
				{field:"c",title:"c",align:"left",halign:"center",width:200},            
			]],
			columns:[[
			    {field:"d",title:"d",align:"left",halign:"center",width:150},
			    {field:"e",title:"e",align:"left",halign:"center",width:350},
			    {field:"f",title:"f",align:"left",halign:"center",width:200},
			    {field:"g",title:"g",align:"left",halign:"center",width:200},
			    {field:"h",title:"h",align:"left",halign:"center",width:200},
			    {field:"cz",title:"操作",align:"center",halign:"center",width:200,
			    	formatter: function(value,row,index){
			    		return "<a class='zlzxGridDownloadBtns' data-myfilename='"+row.fileName+"' data-myurl='"+row.fileInfoUrl+"' href='#' style='background-color:#36BDEF;color:#FFFFFF;'>文件下载</a>";
					}
			    }
			]],
			onLoadSuccess : function(){
				$(".zlzxGridDownloadBtns").linkbutton({
					plain : true,
					onClick : function(){
						var url = $(this).data("myurl");
						doDwonLoad(url);
					}
				});
				$(".zlzxGridDownloadBtns").each(function(){
					var fileName = $(this).data("myfilename");
					$(this).tooltip({    
						position: 'right',    
						content: "<span style='color:#fff'>"+fileName+"</span>",    
						onShow: function(){        
							$(this).tooltip('tip').css({            
								backgroundColor: '#666',            
								borderColor: '#666'        
							});    
						}
					});
				});
			}
		})
	}
	
	/** 绑定Grid操作按钮方法* */
	function bindGridToorBar() {
		$("a[data-action='ZLZX_ADDBTN']").bind("click",function(){
			openFormWin();
		});
		
		$("a[data-action='ZLZX_UPDATEBTN']").bind("click",function(){
			var row = gridSelectedValid(grid);
			if(row){
				openFormWin(row.id,row.userName);
			}
		});
		
		$("a[data-action='ZLZX_DELETEBTN']").bind("click",function(){
			deleteByIds();
		});
	}
	
	function bindSearchBtns(){
		$("#query").unbind().bind("click",function(){
			console.log(queryForm);
			var formData = queryForm.serializeObject({transcript:"overlay"});
			grid.datagrid("load",formData);
		});
		$("#clear").unbind().bind("click",function(){
			queryForm.form("clear");
		});
	}
	
	/**跳转到新增/修改页面**/
	function openFormWin(id,userName){
		var curUserName = $("#" + modelName + "_hide_curusername").val();
		var title = id ? (userName == curUserName ? "文件上传[修改/查看]" : "文件上传[查看]" ): "文件上传[新增]";
		var win = $("<div id='" + modelName + "_formWin'></div>").window({
			title : title,
			href :URL.formWin,
			width : 600,
			height : 392,
			onLoad : function(){				
	        	if(id){
					formLoadData(id);
					if(userName != curUserName){
						$("#" + modelName + "_form_fileInfo").parent().find(".icon-add").remove();
						$("#" + modelName + "_form_fileInfo").parent().find(".icon-remove").remove();
						$("a[data-action='ZLZX_SAVEBTN']").addClass("hide");
		        	}
				}
	        	closeLoadingDiv();
			},
			onClose : function() {
				win.window('destroy');
			}
		});
	}
	
	/**打开出入记录页面**/
	function doDwonLoad(url){
		//执行文件下载
		window.open(ctx+url);
	}
	
	/**
	 * 编辑页面获取信息
	 */
	function formLoadData(id){
		$.ajax({
			type : "get",
			url :URL.getInfo,
			data : {id:id},
			success : function(data){
				$("#" + modelName + "_form").form("load", data);
			}
		});
	}
	
	/**
	 * 删除
	 */
	function deleteByIds(){
		var curUserName = $("#" + modelName + "_hide_curusername").val();
		var rows = grid.datagrid("getChecked");
		var idArray = new Array();
		if (rows.length > 0) {
			for(var i = 0; i < rows.length; i++){
				var userName = rows[i].userName;
				if(userName != curUserName){
					showMsg("只能删除本人上传的数据！");
					return false;
				}
				idArray.push(rows[i].id);
			}
			var ids = idArray.join(",");
			$.messager.confirm("删除确认", Msg.delconfirm, function(r) {
				if (r) {
					$.ajax({
						type : "post",
						url : URL.deleteUrl,
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
		} else {
			$.messager.alert("提示", "您尚未勾选数据！");
			return false;
		}
	}
	
});