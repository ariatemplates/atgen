/*
 * Copyright Amadeus
 */
Aria.tplScriptDefinition({$classpath:"aria.tools.ToolsDisplayScript",$prototype:{$dataReady:function(){if(this.moduleCtrl.subModulesList.length>0)this.moduleCtrl.subModulesList[0]["view:selected"]=true},onModuleEvent:function(){this.$refresh()},selectTab:function(e,c){for(var b=this.moduleCtrl.subModulesList,a=0,d=b.length;a<d;a++)b[a]["view:selected"]=b[a].refpath==c?true:false;this.$refresh()}}});