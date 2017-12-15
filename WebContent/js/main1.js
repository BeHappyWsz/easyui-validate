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
        onContextMenu:function(e,title,index){
//            var subtitle = $(this).text();
//            $("#mainTabs").tabs('select', subtitle);
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
        var allTabs = $("#mainTabs").tabs('tabs');
        var allTabtitle = [];
        $.each(allTabs,function(i,n){
            var opt=$(n).panel('options');
            if(opt.closable)
                allTabtitle.push(opt.title);
        });
        console.log(menu);
        switch (id){
            case 1 :
                $("#mainTabs").tabs("close", 1);
                break;
            case 2 :
                for(var i=0;i<allTabtitle.length;i++){
                    $("#mainTabs").tabs('close', allTabtitle[i]);
                }
                break;
            case 3 :
        
            break;
            case 4 :
        
            break;
            case 5 :
        
            break;
        }
    }
});