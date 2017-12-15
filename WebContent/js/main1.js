$(function() {
	var URL = {

	};

	renderLeftMenu();
	/** 渲染左部菜单 * */
	function renderLeftMenu() {
		$("#indexleftmenutree").tree({
			url : "json/treedata.json",
			rootWidth : "184",
			kidWidth : "180",
			height : "auto",
			onSelect : function(node) {
				var isLeaf = $(this).tree('isLeaf',node.target);
				if(isLeaf){
					openLeftWin(node);
				}
			}
		});
	}

	/** * */
	function openLeftWin(node) {
		var tabName = node.text;
		if ($("#mainTabs").tabs("exists", tabName)) {
			// 如果已存在，选中
			$("#mainTabs").tabs("select", tabName);
		} else {
			if(null != node.url && undefined != node.url && "" != node.url && "undefined" != node.url ){
				
			}
			$("#mainTabs").tabs("add", {
				title : tabName,
				selected : true,
				closable : true,
				href : "newWin.jsp",
				tools : [ {
					iconCls : "icon-page_refresh",
					handler : function() {
						var currentTab = $("#mainTabs").tabs('getSelected');
						RefreshTab(currentTab);
					}
				} ],
				onLoad : function() {

				}
			});
			//
		}
	}

	function RefreshTab(currentTab) {
		var url = $(currentTab.panel('options')).attr('href');
		$('#tabs').tabs('update', {
			tab : currentTab,
			options : {
				href : url
			}
		});
		currentTab.panel('refresh');
	}
	
	$("#mainTabs").tabs({
        onContextMenu:function(e,title,index){
            e.preventDefault();
            $("#tab-tools").menu('show', {
                left : e.pageX,
                top : e.pageY
            });
        }
    });
	
	$("#tab-tools").menu({
        onClick : function (node) {
            closeTab(this, node.id);
        }
    });
	
	//删除Tabs
    function closeTab(menu, id){
        switch (id){
            case '1' ://刷新
            	var tab = $("#mainTabs").tabs('getSelected');
            	RefreshTab(tab);
                break;
            case '2' ://关闭当前标签
            	var tab = $("#mainTabs").tabs('getSelected');
                var index = $("#mainTabs").tabs('getTabIndex',tab);
                $("#mainTabs").tabs("close", index);
                break;
            case '3' ://关闭非当前标签
                var tablist = $("#mainTabs").tabs('tabs');
                var tab = $("#mainTabs").tabs('getSelected');
                var index = $("#mainTabs").tabs('getTabIndex',tab);
                for(var i=tablist.length-1;i>index;i--){
                    $("#mainTabs").tabs('close',i);
                }
                var num = index-1;
                for(var i=num;i>=0;i--){
                    $("#mainTabs").tabs('close',0);
                }
                break;
            case '4' ://关闭左侧
            	var tablist = $("#mainTabs").tabs('tabs');
                var tab = $("#mainTabs").tabs('getSelected');
                var index = $("#mainTabs").tabs('getTabIndex',tab);
                var num = index-1;
                for(var i=num;i>=0;i--){
                    $("#mainTabs").tabs('close',0);
                }
                break;
            case '5' ://关闭右侧
            	var tablist = $("#mainTabs").tabs('tabs');
                var tab = $("#mainTabs").tabs('getSelected');
                var index = $("#mainTabs").tabs('getTabIndex',tab);
                for(var i=tablist.length-1;i>index;i--){
                    $("#mainTabs").tabs('close',i);
                }
            	break;
            case '6'://关闭所有
            	var tablist = $("#mainTabs").tabs('tabs');
                for(var i=tablist.length-1;i>=0;i--){
                    $("#mainTabs").tabs("close", i);
                }
            	break;
            default:
            	
        }
    }
});