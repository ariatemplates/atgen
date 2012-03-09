/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.mini.Mini',
 	$css:['aria.tester.runner.view.mini.MiniCSS'],
	$hasScript:true,
	$width : {"min":180},
	$height : {"min":342}
}}
	{macro main()}
		<div  style="position:absolute;top:0px;left:0px;z-index:12000">
			{@aria:Template {
				defaultTemplate:"aria.tester.runner.view.popup.Popup"
			} /}
		</div>
		<div class="monitor" style="
			height : ${$vdim(342)}px;
			width : ${$hdim(180)}px;
		">
			{@aria:Template {
				height:$vdim(342,1),
				width:$hdim(180,1),
				defaultTemplate:"aria.tester.runner.view.monitor.Monitor"
			} /}
		</div>
	{/macro}
{/Template}