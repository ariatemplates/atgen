/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.popup.warning.Warning',
	$extends:'aria.tester.runner.view.popup.generic.Generic',
	$hasScript:true,
	$css : ['aria.tester.runner.view.popup.warning.WarningCSS']
}}
	{macro displayPopupTitle()}
		Load Error !
	{/macro}
	{macro displayPopupContent()}
		<div style="margin-top:10px;margin-left:0px;">
			! No TestSuite was found for the classpath : "<b>${data.campaign.rootClasspath}</b>"
		</div>
		<div style="margin:10px;margin-left:0px;color:#444">
			As explained in the documentation, we strongly suggest you create a test suite with the <b>MainTestSuite</b> classpath.
		</div>
		<div style="margin:10px;margin-left:0px;color:#444">
			Alternatively, please enter the classpath of your test suite below :
		</div>
		<br/>
		{@aria:TextField {
			bind:{value: {inside:this.data.campaign, to:"newClasspath"}},
			helptext : "Enter your classpath here"
		} /}
	{/macro}
	{macro displayButtons()}
		{call displayButton("load", this._onReloadButtonClicked)/}
	{/macro}
{/Template}