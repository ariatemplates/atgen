/*
 * Copyright Amadeus
 */
//***MULTI-PART
//AISBa0GIBM
//LOGICAL-PATH:aria/resources/handlers/LCResourcesHandler.js
//AISBa0GIBM
(function(){var k,i,j;Aria.classDefinition({$classpath:"aria.resources.handlers.LCResourcesHandler",$dependencies:["aria.utils.String","aria.resources.handlers.LCResourcesHandlerBean"],$statics:{SUGGESTION_BEAN:"aria.resources.handlers.LCResourcesHandlerBean.Suggestion"},$constructor:function(){this.threshold=1;this.codeExactMatch=true;this._suggestions=[]},$destructor:function(){this._suggestions=null},$onload:function(){k=aria.core.JsonValidator;i=aria.utils.String;j=aria.utils.Type},$onunload:function(){j=
i=k=null},$prototype:{getSuggestions:function(a,d){if(j.isString(a)&&a.length>=this.threshold){a=i.stripAccents(a).toLowerCase();var c=[],g=[],e=this._suggestions.length,f=a.length,h,b;for(h=0;h<e;h++){b=this._suggestions[h];if(b.code===a){b.original.exactMatch=true;c.unshift(b.original)}else if(b.code.substring(0,f)===a&&!this.codeExactMatch){c.push(b.original);b.original.exactMatch=false}else if(b.label.substring(0,f)===a){var l=b.label===a;(b.original.exactMatch=l)?g.unshift(b.original):g.push(b.original)}}c=
c.concat(g);this.$callback(d,c)}else this.$callback(d,null)},getDefaultTemplate:function(){return"aria.widgets.form.list.templates.LCTemplate"},setSuggestions:function(a){if(j.isArray(a)){for(var d=[],c=0,g=a.length;c<g;c++){var e=a[c];if(!k.check(e,"aria.resources.handlers.LCResourcesHandlerBean.Suggestion"))return this.$logError("Suggestions does not match suggestion bean aria.resources.handlers.LCResourcesHandleBean.Suggestions",null,a);d.push({label:i.stripAccents(e.label).toLowerCase(),code:i.stripAccents(e.code).toLowerCase(),
original:e})}d.sort(function(f,h){return f.label<h.label?1:f.label>h.label?-1:0});this._suggestions=d}else return this.$logError("Suggestions must be an array.",null,a)},setThreshold:function(a){this.threshold=a},suggestionToLabel:function(a){return a.label},getAllSuggestions:function(a){for(var d=this._suggestions,c=d.length,g=[],e,f=0;f<c;f++){e=d[f];g.push(e.original)}this.$callback(a,g)}}})})();
//AISBa0GIBM
//LOGICAL-PATH:aria/resources/handlers/LCResourcesHandlerBean.js
//AISBa0GIBM
Aria.beanDefinitions({$package:"aria.resources.handlers.LCResourcesHandlerBean",$description:"Definition of the suggestions used in the LC resource handler",$namespaces:{base:"aria.widgets.form.AutoCompleteBean",json:"aria.core.JsonTypes"},$beans:{Suggestion:{$type:"base:Suggestion",$description:"A Label-Code suggestion",$restricted:false,$properties:{label:{$type:"json:String",$description:"label for this suggestion",$sample:"Paris",$mandatory:true},code:{$type:"json:String",$description:"A code matching this suggestion",
$sample:"PAR"}}}}});