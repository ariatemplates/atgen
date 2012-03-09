/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.modules.urlService.PatternURLCreationImpl",$implements:["aria.modules.urlService.IUrlService"],$constructor:function(b,c){this.actionUrlPattern=b||"";this.i18nUrlPattern=c||""},$destructor:function(){},$prototype:{createActionUrl:function(b,c,d){var a=this.actionUrlPattern;a=a.replace(/\$\{moduleName\}/g,b||"");a=a.replace(/\$\{actionName\}/g,c||"");return a=a.replace(/\$\{sessionId\}/g,d||"")},createI18nUrl:function(b,c,d){var a=this.i18nUrlPattern;a=a.replace(/\$\{moduleName\}/g,
b||"");a=a.replace(/\$\{sessionId\}/g,c||"");return a=a.replace(/\$\{locale\}/g,d||"")}}});