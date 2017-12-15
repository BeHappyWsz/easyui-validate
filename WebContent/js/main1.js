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
				openLeftWin(node);
			}
		});
	}

	/** * */
	function openLeftWin(node) {
		var tabName = node.text;
		if ($("div[data-id=mainTabs]").tabs("exists", tabName)) {
			// 如果已存在，选中
			$("div[data-id=mainTabs]").tabs("select", tabName);
		} else {
			if(null != node.url && undefined != node.url && "" != node.url && "undefined" != node.url ){
				
			}
			$("div[data-id=mainTabs]").tabs("add", {
				title : tabName,
				selected : true,
				closable : true,
				href : "newWin.jsp",
				tools : [ {
					iconCls : "icon-page_refresh",
					handler : function() {
						var currentTab = $("div[data-id=mainTabs]").tabs('getSelected');
						RefreshTab(currentTab);
					}
				} ],
				onLoad : function() {

				}
			});
			
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
		}
	}

	$("#mainTabs").tabs({
        onContextMenu:function(e, title,index){
            e.preventDefault();
            if(index>0){
                $("#tab-tools").menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        }
    });
	
	$("#tab-tools").menu({
        onClick : function (item) {
            closeTab(this, item.name);
        }
    });
	function closeTab(menu, type) {
		alert("aa");
	}
});