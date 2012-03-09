/*
 * Copyright Amadeus
 */
Aria.tplScriptDefinition({$classpath:"aria.tools.inspector.ModuleInspectorScript",$prototype:{$dataReady:function(){this.data["view:dataDepth"]||(this.data["view:dataDepth"]=3)},reloadModule:function(){this.moduleCtrl.reloadModule(this.data.moduleCtrl)},onModuleEvent:function(){}}});