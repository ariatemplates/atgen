/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.modules.requestHandler.JSONRequestHandler",$extends:"aria.modules.requestHandler.RequestHandler",$implements:["aria.modules.requestHandler.IRequestHandler"],$statics:{PARSING_ERROR:"Response text could not be evaluated as JSON."},$prototype:{processSuccess:function(b,a,c){a={};if(b.responseJSON)a.response=b.responseJSON;else if(b.responseText){a.response=aria.utils.Json.load(b.responseText,this,this.PARSING_ERROR);if(!a.response)a.error=true;if(a.error)a.errorData=
{messageBean:{localizedMessage:this.PARSING_ERROR,type:"PARSINGERROR"}}}else a.response=null;this.$callback(c,a)}}});