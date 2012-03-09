/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.normal.Normal',
	$hasScript:true,
	$width : {"min":390},
	$height : {"min":342}
}}
	{macro main()}	
		<div  style="position:absolute;top:0px;left:0px;z-index:12000">
			{@aria:Template {
				defaultTemplate:"aria.tester.runner.view.popup.Popup"
			} /}
		</div>
		<div class="header" style="
			width : ${$hdim(390)}px;
		">
		</div>
		<div style="float:left;position:relative">
		{@aria:Template {
			width:200,
			height:$vdim(342,1),
			defaultTemplate:"aria.tester.runner.view.nav.Nav"
		} /}
		</div>
		<div class="monitor" style="
			height : ${$vdim(282)}px;
			width : ${$hdim(180)}px;
		">
			{@aria:Template {
				height:$vdim(282,1),
				width:$hdim(180,1),
				defaultTemplate:"aria.tester.runner.view.monitor.Monitor"
			} /}
		</div>
	{/macro}
{/Template}