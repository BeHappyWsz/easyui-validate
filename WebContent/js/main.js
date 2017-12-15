$(function() {
	var URL = {
			//获取数据url
	};

	/** 左侧menu菜单 * */
	renderLeftMenu();
	function renderLeftMenu() {
		$("#menutree").tree({
			url : "json/treedata.json",
			rootWidth : "184",
			kidWidth : "180",
			height : "auto",
			onSelect : function(node) {
				var isLeaf = $(this).tree('isLeaf',node.target);//只可选择tree子节点
				if(isLeaf){
					openLeftWin(node);//打开新的tabs
				}
			}
		});
	}

	/**打开新的tabs **/
	function openLeftWin(node) {
		var tabName = node.text;
		if($("#mainTabs").tabs("exists", tabName)) {// 如果已存在，选中
			$("#mainTabs").tabs("select", tabName);
		}else {
			$("#mainTabs").tabs("add", {
				title : tabName,
				selected : true,
				closable : true,
//				href : "newWin.jsp",//此处可动态跳转页面
				href : node.page,//此处可动态跳转页面,在加载的json、或者后台数据中组合添加属性即可
				tools : [ {  //加载刷新小按钮
					iconCls : "icon-page_refresh",//应该使用8*8像素图片,没有找到8*8
					handler : function() {
						var currentTab = $("#mainTabs").tabs('getSelected');
						refreshTab(currentTab);
					}
				} ]
			});
		}
	}

	/**
	 * 通用刷新tabs方法
	 * currentTab 刷新的tabs对象
	 */
	function refreshTab(currentTab) {
		var url = $(currentTab.panel('options')).attr('href');
		$('#tabs').tabs('update', {
			tab : currentTab,
			options : {
				href : url //重新获取目标页面
			}
		});
		currentTab.panel('refresh');//刷新
	}
	
	/**
	 * 新增tabs右击事件
	 */
	$("#mainTabs").tabs({
        onContextMenu:function(e,title,index){
            e.preventDefault();
            $("#tab-tools").menu('show', {
                left : e.pageX,
                top : e.pageY
            });
        }
    });
	/**
	 * tabs右击菜单绑定事件
	 */
	$("#tab-tools").menu({
        onClick : function (node) {
            closeTab(this, node.id);
        }
    });
	
	/**
	 * 相关右击菜单的点击事件
	 * menu 此处没有用到,即当前选择的menu菜单
	 * id menu菜单的id标识，可用其他唯一标识代替
	 */
    function closeTab(menu, id){
    	var tab = $("#mainTabs").tabs('getSelected');//当前所选tab
    	var index = $("#mainTabs").tabs('getTabIndex',tab);//当前所选tab的下标位置
    	var tablist = $("#mainTabs").tabs('tabs');  //所有的tabs列表
        switch (id){
            case '1' ://刷新
            	RefreshTab(tab);
                break;
            case '2' ://关闭当前标签
                $("#mainTabs").tabs("close", index);
                break;
            case '3' ://关闭非当前标签
                for(var i=tablist.length-1;i>index;i--){
                    $("#mainTabs").tabs('close',i);
                }
                var num = index-1;
                for(var i=num;i>=0;i--){
                    $("#mainTabs").tabs('close',0);
                }
                break;
            case '4' ://关闭左侧
                var num = index-1;
                for(var i=num;i>=0;i--){
                    $("#mainTabs").tabs('close',0);
                }
                break;
            case '5' ://关闭右侧
                for(var i=tablist.length-1;i>index;i--){
                    $("#mainTabs").tabs('close',i);
                }
            	break;
            case '6'://关闭所有
                for(var i=tablist.length-1;i>=0;i--){
                    $("#mainTabs").tabs("close", i);
                }
            	break;
            default:
        }
    }
});