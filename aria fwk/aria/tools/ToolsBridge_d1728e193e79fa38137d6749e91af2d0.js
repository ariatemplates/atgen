/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.tools.ToolsBridge",$extends:"aria.utils.Bridge",$singleton:true,$constructor:function(){this.$Bridge.constructor.call(this)},$prototype:{open:function(){return this.$Bridge.open.call(this,{moduleCtrlClasspath:"aria.tools.ToolsModule",displayClasspath:"aria.tools.ToolsDisplay",title:"Tools"})}}});