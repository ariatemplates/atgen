/*
 * Copyright Amadeus
 */
Aria.tplScriptDefinition({$classpath:"aria.tools.contextual.ContextualDisplayScript",$prototype:{openDebug:function(){this.data.driver.openTools()},reloadTemplate:function(){this.data.templateCtxt.$reload();this.data.driver.close()},reloadModule:function(){aria.templates.ModuleCtrlFactory.reloadModuleCtrl(this.data.templateCtxt.moduleCtrlPrivate);this.data.driver.close()}}});