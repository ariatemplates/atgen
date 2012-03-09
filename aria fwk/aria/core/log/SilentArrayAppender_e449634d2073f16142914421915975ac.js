/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.core.log.SilentArrayAppender",$constructor:function(){this.logs=[]},$destructor:function(){this.logs=[]},$prototype:{isEmpty:function(){return this.logs.length==0},empty:function(){this.logs=[]},getLogs:function(){return this.logs},setLogs:function(a){this.logs=a},_saveLog:function(a){this.logs.push(a)},debug:function(a,b,c,d){this._saveLog({level:"debug",msg:b,className:a,msgId:c,objOrErr:d})},info:function(a,b,c,d){this._saveLog({level:"info",msg:b,className:a,
msgId:c,objOrErr:d})},warn:function(a,b,c,d){this._saveLog({level:"warn",msg:b,className:a,msgId:c,objOrErr:d})},error:function(a,b,c,d){this._saveLog({level:"error",msg:b,className:a,msgId:c,objOrErr:d})}}});