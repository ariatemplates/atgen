/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.popup.report.Report',
	$extends:'aria.tester.runner.view.popup.generic.Generic',
	$css : ['aria.tester.runner.view.popup.report.ReportCSS'],
	$hasScript:true
}}
	{macro displayPopupTitle()}
		Error Report
	{/macro}
	{macro displayButtons()}
		{call displayButton("reload", this._onReloadButtonClicked)/}
		{call displayButton("close", this._onCloseButtonClicked)/}
	{/macro}
	
	{macro displayPopupContent()}
		{var tests = this.getTestsWithErrors()/}
		{if tests.length == 0}
			<div class="noerrors">
				No errors to report ! 
			</div>
		{else/}
			{foreach test in tests} 
				{var classname = "test"/}
				{if (test.classpath == this.data.view.highlightedTest)}
					{set classname+=" highlight"/}
				{/if}
				<div class="${classname}">
					{call displayTestErrors(test)/}		
				</div>
			{/foreach}
		{/if}
	{/macro}
	
	{macro displayTestErrors(test)}
		<div class="classpath">
			${this.formatTestClasspath(test)}
		</div>
		<div class="count">
			(${this.formatTestErrorsCount(test)})
		</div>
		{var errors = this.getTestErrors(test)/}
		{if errors.length == 0}
			No errors to display for this test
		{else/}
			<ul>
			{foreach error in errors} 
				{call displayTestError(error, test)/}		
			{/foreach}
			</ul>
		{/if}
	{/macro}
	{macro displayTestError(error, test)}
		<li class="error">
			<div class="message">
				${this.formatErrorMessage(error)}
			</div>
		</li>
	{/macro}
{/Template}