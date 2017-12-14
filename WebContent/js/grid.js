$(function(){
	var URL = {
			gridData : 	"json/datagrid.json",
			formWin  :  "newWin.jsp"
	};
	
	/** 模块名称* */
	var modelName = "demo";
	
	/** 查询表单+按钮* */
	var queryForm = $("#qf");
	bindSearchBtns();
	
	/** grid对象+渲染+按钮* */
	var grid = $("#grid");
	renderGrid();
	bindGridToorBar();
	
	//渲染datagrid,固定数据无法分页。
	function renderGrid(){
		grid.datagrid({
			url :URL.gridData,
			onDblClickRow : function(index,row) {//双击事件
					openFormWin(row.id,row.d);
			},
			queryParams:{//进行传参,此处只是模拟。
				id :'FI-SW-01',
				d  :'Large'
			},
			frozenColumns :[[
				{field:"id",checkbox:true},
				{field:"a",title:"a",align:"left",halign:"center",width:100},
				{field:"b",title:"b",align:"left",halign:"center",width:100},
				{field:"c",title:"c",align:"left",halign:"center",width:100},            
			]],
			columns:[[
			    {field:"d",title:"d",align:"left",halign:"center",width:100},
			    {field:"e",title:"e",align:"left",halign:"center",width:100},
			    {field:"f",title:"f",align:"left",halign:"center",width:100},
			    {field:"g",title:"g",align:"left",halign:"center",width:100},
			    {field:"h",title:"h",align:"left",halign:"center",width:100},
			    {field:"cz",title:"操作",align:"center",halign:"center",width:200,formatter: fmtCz}
			]],
			onLoadSuccess : function(){
				$(".fmtBtn").linkbutton({
					plain : true,
					onClick : function(){
						var id = $(this).data("id");
						doSomething(id);
					}
				});
				//也可用只渲染为按钮
				$(".fmtBtn").each(function(){
					var d = $(this).data("d");
					$(this).tooltip({    
						position: 'right',    
						content: "<span style='color:#abc'>"+d+"</span>",    
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
	
	/**
	 * formatter方法
	 */
	function fmtCz(value,row,index){
		return "<a class='fmtBtn' data-id='"+row.id+"' data-d='"+row.d+"' href='#' style='background-color:#36BDEF;color:#FFFFFF;'>点击</a>";
	}
	
	/*
	 * 进行其他操作
	 */
	function doSomething(id){
		alert(id);
	}
	
	/** grid按钮事件* */
	function bindGridToorBar() {
		$("#addBtn").bind("click",function(){
			openFormWin();
		});
		
		$("#updateBtn").bind("click",function(){
			var row = gridSelectedValid(grid);
			if(row){
				openFormWin(row.id);
			}
		});
		
		$("#delBtn").bind("click",function(){
			deleteByIds();
		});
	}
	/** 查询按钮事件 **/
	function bindSearchBtns(){
		
		//带参数，也可序列化数组类型,load时可查看js中url中的参数
		$("#query").unbind().bind("click",function(){
			var formData = queryForm.serializeObject({transcript:"overlay"});
			grid.datagrid("load",formData);
		});
		//查询form清空
		$("#clear").unbind().bind("click",function(){
			queryForm.form("clear");
		});
	}
	
	/**跳转到其他页面**/
	function openFormWin(id,d){
		var win = $("<div id='newWin'></div>").window({
			title : id ? "查看" :"新增",
			href :URL.formWin,
			width : 500,
			height : 302,
			onLoad : function(){				
	        	if(id){
					formLoadData(id);
				}
	        	$("#haha").textbox("setValue",d);
	        	closeLoadingDiv();
			},
			onClose : function() {
				win.window('destroy');
			}
		});
	}
	
	//查询数据并渲染展示到页面
	function formLoadData(id){
		$.ajax({
			type : "get",
			url :URL.getInfo,
			data : {id:id},
			success : function(data){
				$("#newForm").form("load", data);
			}
		});
	}
	
	//删除测试
	function deleteByIds(){
		var ids = gridCheckedValid(grid);
		if(ids){
			$.messager.confirm("提示","是否确定?",function(r){
				if(r){
					alert(ids);
				}
			});
		}
	}
	
});