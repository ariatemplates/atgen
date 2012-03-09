/*
 * Copyright Amadeus
 */
Aria.classDefinition({$classpath:"aria.utils.environment.Number",$extends:"aria.core.environment.EnvironmentBase",$dependencies:["aria.utils.environment.NumberCfgBeans"],$singleton:true,$prototype:{_cfgPackage:"aria.utils.environment.NumberCfgBeans.AppCfg",getCurrencyFormats:function(){return this.checkApplicationSettings("currencyFormats")},getDecimalFormatSymbols:function(){return this.checkApplicationSettings("decimalFormatSymbols")}}});