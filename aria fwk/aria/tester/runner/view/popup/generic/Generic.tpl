/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.popup.generic.Generic',
	$hasScript:true
}}
	{macro main()}
		<div class="mask"></div>
		<div class="popup">
			<h1 class="title">{call displayPopupTitle()/}</h1>
			<div class="separator"></div>
			<div class="content">
				{call displayPopupContent()/}
			</div>
			<div class="separator"></div>
			<div class= "buttonContainer">
				{call displayButtons()/}
			</div>
		</div>
	{/macro}
	
	{macro displayButton(label, callback)}
		<div class="popupButton ${label}"
			{on click {
				fn : callback,
				scope : this
			}/}
		>
			${getLabelWithShortcut(label)}
		</div>
	{/macro}
{/Template}