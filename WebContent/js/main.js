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
		var tabName = node.text+"<input type='hidden' data-mytabcode='"+node.code+"'/>";
		var tabCode = node.code;
		if ($("input[data-mytabcode='"+tabCode+"']").size() != 0) {
			// 如果已存在，选中
			$("div[data-id=mainTabs]").tabs("select", tabName);
		} else {
			$("div[data-id=mainTabs]").tabs("add", {
				title : tabName,
				selected : true,
				closable : true,
				href : "newWin.jsp",
				tools : [ {
					iconCls : "icon-mini-refresh",
					handler : function() {
						var currentTab = $("div[data-id=mainTabs]").tabs('getSelected');
						RefreshTab(currentTab);
					}
				} ],
				onDestroy : function(){
					
				},
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

});