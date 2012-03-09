/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.templates.TextTemplate",$extends:"aria.templates.BaseTemplate",$dependencies:["aria.templates.TxtCtxt"],$constructor:function(){this.$BaseTemplate.constructor.call(this)},$destructor:function(){this.$BaseTemplate.$destructor.call(this)},$prototype:{data:{},$init:function(c,d){c.$BaseTemplate.constructor.classDefinition.$prototype.$init(c,d);aria.templates.TextTemplate.processTextTemplate=function(a){var b=new aria.templates.TxtCtxt;b.initTemplate({classpath:this.prototype.$classpath,
data:a});a=b.getTextTemplateContent();b.$dispose();return a}}}});