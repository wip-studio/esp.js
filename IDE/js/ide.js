define(['underscore','backbone','app/system/preloader','app/views/codeview','app/views/header','app/system/windows','app/views/projectview'],
	function(_,Backbone,Preloader,CodeView,Header,Windows,ProjectView){
	var self={};	
	var nwGui=require("nw.gui");
	return (window.IDE=_.extend(self,{
		myHead:null,
		codeView:null,
		projectview:null,
		start:function()
		{

			console.log("Ide Start loading");
			this.myHead=new Header({
				win:nwGui.Window.get(),
				onClose:_.bind(this.onclose,this)
			});
			this.myHead.headermenu.addMenu("file","file");
			this.myHead.headermenu.addSubMenu("file",{
				id:'new',
				name:'new',
                trig:'buffer.createfile'
			});
			this.myHead.headermenu.addSubMenu("file",{
				id:'open',
				name:'open',
                trig:'buffer.openfile'
			});
			this.myHead.headermenu.addSubMenu("file",{
				id:'save',
				name:'save',
                trig:'buffer.saveactive'
			});
			this.myHead.headermenu.addSubMenu("file",{
				id:'saveas',
				name:'save as',
                trig:'buffer.saveactiveas'
			});
			this.myHead.headermenu.addSubMenu("file",{
				seperator:true
			});
			this.myHead.headermenu.addSubMenu("file",{
				id:'quit',
				name:'quit'
			});
			this.myHead.headermenu.addMenu("edit","edit");
			this.myHead.headermenu.addMenu("project","project");
			this.myHead.headermenu.addMenu("build","build");
			this.myHead.headermenu.addMenu("window","window");
			this.myHead.headermenu.addMenu("Board","Board");
			this.myHead.headermenu.addMenu("help","help");
			nwGui.Window.get().on("close",_.bind(this.onclose,this));
			this.codeView=new CodeView();
			this.projectview=new ProjectView();
			window.windows=Windows;
		},
		onclose:function()
		{
			nwGui.App.quit();
			return true;
		}
	}));
});
/*
<li><span>file</span><ul><li>New</li><li>Open</li><hr/><li>Quit</li></ul></li>
			<li><span>edit</span></li>
			<li><span>project</span></li>
			<li><span>build</span></li>
			<li><span>window</span></li>
			<li><span>Board</span></li>
			<li><span>help</span></li>*/