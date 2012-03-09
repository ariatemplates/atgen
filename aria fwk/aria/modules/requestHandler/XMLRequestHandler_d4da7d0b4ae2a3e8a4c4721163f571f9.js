/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.modules.requestHandler.XMLRequestHandler",$extends:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$statics:{MIMETYPE_ERROR:"Response type is badly configured, it should have returned a xml response."},$prototype:{processSuccess:function(a,b,c){a=!a.responseXML||a.responseXML&&!a.responseXML.documentElement?{response:null,error:true,errorData:{messageBean:{localizedMessage:this.MIMETYPE_ERROR,type:"TYPEERROR"}}}:
this.processXMLDocument(a.responseXML.documentElement,b);this.$callback(c,a)},processXMLDocument:function(a){return{response:a}}}});