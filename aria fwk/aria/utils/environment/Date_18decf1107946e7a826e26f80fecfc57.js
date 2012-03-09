/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.utils.environment.Date",$dependencies:["aria.utils.environment.DateCfgBeans"],$extends:"aria.core.environment.EnvironmentBase",$singleton:true,$prototype:{_cfgPackage:"aria.utils.environment.DateCfgBeans.AppCfg",getDateFormats:function(){return this.checkApplicationSettings("dateFormats")},getTimeFormats:function(){return this.checkApplicationSettings("timeFormats")},getFirstDayOfWeek:function(){return this.checkApplicationSettings("firstDayOfWeek")}}});