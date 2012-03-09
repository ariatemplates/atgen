/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.monitor.Monitor',
	$hasScript:false,
	$width : {min:180},
	$height : {min:282},
	$css : ['aria.tester.runner.view.monitor.MonitorCSS']
}}
	{macro main()}
		{var width = 180-2/}
		<div class="monitorContainer" 
			style="
				height : ${$vdim(280)}px;
				width : ${$hdim(width)}px;
		">
			{@aria:Template {
				width:$hdim(width,1),
				height:50,
				defaultTemplate:"aria.tester.runner.view.header.Header",
				block:true
			} /}
			{@aria:Template {
				width:$hdim(width,1),
				height:25,
				defaultTemplate:"aria.tester.runner.view.filter.Filter",
				block:true
			} /}
			{@aria:Template {
				width:$hdim(width,1),
				height:$vdim(203,1),
				defaultTemplate:"aria.tester.runner.view.report.Report",
				block:true
			} /}
		</div>
	{/macro}
{/Template}