/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.popup.options.Options',
	$extends:'aria.tester.runner.view.popup.generic.Generic',
	$css : ['aria.tester.runner.view.popup.options.OptionsCSS'],
	$hasScript:true
}}
	{macro displayPopupTitle()}
		Options
	{/macro}
	{macro displayPopupContent()}
		<ul class="optionsList">
			<li class="option">
				<h2 class="optionTitle">Coverage</h2>
				{@aria:CheckBox {
					label : "Enable coverage (beta!)",
					bind:{
						value:{
							inside:this.data.application.configuration, 
							to:"coverage"
						}
					}
				} /}
			</li>
		</ul>
	{/macro}
	{macro displayButtons()}
		{call displayButton("apply", this._onApplyButtonClicked)/}
		{call displayButton("cancel", this._onCancelButtonClicked)/}
	{/macro}
{/Template}