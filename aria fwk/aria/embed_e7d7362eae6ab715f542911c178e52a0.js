/*
 * Copyright Amadeus
 */
//***MULTI-PART
//AISBa0GIBM
//LOGICAL-PATH:aria/embed/CfgBeans.js
//AISBa0GIBM
Aria.beanDefinitions({$package:"aria.embed.CfgBeans",$description:"Definition of the JSON beans used by the aria embed lib",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{ElementCfg:{$type:"json:Object",$description:"Embed element widget",$properties:{controller:{$type:"json:ObjectRef",$description:"Controller used to manage the embedded dom"},type:{$type:"json:String",$description:"DOM type for this section.",$default:"div"},attributes:{$type:"html:HtmlAttribute",
$description:"Parameters to apply to the DOM element of the section."},args:{$type:"json:MultiTypes",$description:"Argument given to the onEmbededElementCreate and onEmbededElementDispose functions of the provided embed controller"}}}}});
//AISBa0GIBM
//LOGICAL-PATH:aria/embed/Element.js
//AISBa0GIBM
Aria.classDefinition({$classpath:"aria.embed.Element",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.embed.CfgBeans","aria.utils.Html","aria.core.JsonValidator","aria.core.Log","aria.utils.Dom"],$statics:{INVALID_CONFIGURATION:"%1Configuration for widget is not valid."},$constructor:function(d){this.$BaseWidget.constructor.apply(this,arguments);try{this._cfgOk=aria.core.JsonValidator.normalize({json:d,beanName:"aria.embed.CfgBeans.ElementCfg"},true)}catch(a){var b=aria.core.Log;if(b){for(var c,
e=0,f=a.errors.length;e<f;e++){c=a.errors[e];c.message=b.prepareLoggedMessage(c.msgId,c.msgArgs)}this.$logError(this.INVALID_CONFIGURATION,null,a)}}},$destructor:function(){if(this._domId)this._cfg.controller.onEmbededElementDispose(aria.utils.Dom.getElementById(this._domId),this._cfg.args);this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{writeMarkup:function(d){if(this._cfgOk){this._domId=this._createDynamicId();var a=this._cfg.type,b=["<",a,' id="',this._domId,'"'];this._cfg.attributes&&
b.push(" "+aria.utils.Html.buildAttributeList(this._cfg.attributes));b.push("></"+a+">");d.write(b.join(""))}},initWidget:function(){if(this._cfgOk)this._cfg.controller.onEmbededElementCreate(aria.utils.Dom.getElementById(this._domId),this._cfg.args)}}});
//AISBa0GIBM
//LOGICAL-PATH:aria/embed/EmbedLib.js
//AISBa0GIBM
Aria.classDefinition({$classpath:"aria.embed.EmbedLib",$extends:"aria.widgetLibs.WidgetLib",$singleton:true,$prototype:{widgets:{Element:"aria.embed.Element"}}});
//AISBa0GIBM
//LOGICAL-PATH:aria/embed/IEmbedController.js
//AISBa0GIBM
Aria.interfaceDefinition({$classpath:"aria.embed.IEmbedController",$extends:"aria.templates.IModuleCtrl",$interface:{onEmbededElementCreate:function(){},onEmbededElementDispose:function(){}}});