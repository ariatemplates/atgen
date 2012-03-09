/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.nav.Nav',
	$hasScript:false,
	$width : {value:200},
	$height : {min:342},
 	$css:['aria.tester.runner.view.nav.NavCSS']
}}
	{macro main()}	
		<div style="float:left; overflow:hidden;">
			{call displayLogo()/}
			{call displayWidgets()/}
		</div>
	{/macro}
	
	{macro displayLogo()}
		<div style="
			position:relative;
			height : 90px;
			width:200px;
		">
			{@aria:Template {
				width:200,
				height:90,
				defaultTemplate:'aria.tester.runner.view.logo.Logo'
			} /}
		</div>
	{/macro}
	
	{macro displayWidgets()}
		{call displayWidget("Select Suites", 'aria.tester.runner.view.config.Config')/}
		{call displayWidget("Documentation", 'aria.tester.runner.view.links.Links')/}
	{/macro}
	
	{macro displayWidget(title, classpath)} 
		{@aria:Template {
			width:200,
			height:$vdim(125,0.5),
			defaultTemplate:classpath,
			block:true
		} /}
	{/macro}
{/Template}