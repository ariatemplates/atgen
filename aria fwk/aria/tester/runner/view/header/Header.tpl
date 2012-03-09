/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.header.Header',
	$hasScript:true,
	$width : {"min":178},
	$height : {value:50},
 	$css:['aria.tester.runner.view.header.HeaderCSS']
}}
	{macro main()}	
		<div id="header">
			{call displayStartButton()/}
			{call displayGauge()/}
			{call displayErrorCounter()/}
		</div>
	{/macro}
	
	{macro displayStartButton()}
		{section {
			id: "startButton",
  			bindRefreshTo : [{
			   inside : data.flow,
			   to : "currentState"
  			}]
  		}}
  		
  			{var cssclass = "button"/}
  			{if this.isButtonDisabled()}
  				{set cssclass += " disabled"/}
  			{/if}
			
  			<div 
				{on click {fn:"_onStartTestsButtonClick", scope: this, args: {}}/}
				id="startTestsButton" class="${cssclass}">
				${this.getButtonLabel()}
			</div>
		{/section}
	{/macro}
	
	{macro displayGauge()}
		{section {
			id: "gauge",
  			bindRefreshTo : [{
			   inside : data.campaign,
			   to : "progress" 
  			}]
  		}}
  			{var progress = data.campaign.progress/}
			{var containerWidth = $hdim(25)/}
			
			{var progressText = "Progress : " + progress + "%" /}
			{var filledWidth = (containerWidth/100)*progress/}
			{var emptyWidth = Math.floor(containerWidth - filledWidth)/}
			<div id="testGauge" style="width:${containerWidth}px">
				<span id="gaugeEmpty" style="width:${emptyWidth}px">${progressText}</span>
				<span id="gaugeFilled" style="width:${filledWidth}px">${progressText}</span>
			</div>
		{/section}
	{/macro}
	
	{macro displayErrorCounter()}
		{section {
			id: "errorCounter",
  			bindRefreshTo : [{
			   inside : data.campaign,
			   to : "errorCount" 
  			},{
			   inside : data.flow,
			   to : "currentState"
  			}]
  		}}
  			{var errorCount = data.campaign.errorCount/}
  			{var classname = "errorCounterBox"/}
  			{if errorCount === 0}
  				{set classname += " noError"/}
  				{if data.flow.currentState=="finished"}
  					{set classname += "Finished"/}
  				{elseif data.flow.currentState=="ongoing"/}
  					{set classname += "Ongoing"/}
  				{/if}
  			{else/}
  				{set classname += " error"/}
  			{/if}
  			{if (data.flow.currentState!="finished")}
				{set classname += "Pushed"/}
			{/if}
			<div {on click {fn:"_onErrorCountClick", scope: this, args: {}}/}
			class="${classname}" title="${errorCount} failed test${errorCount!=1?"s":""}">
				${errorCount}
			</div>
		{/section}
	{/macro}
	{macro displayLeftHefader()}
		{section {
			id: "leftHeader",
			bindRefreshTo : [{
			   inside : data.flow,
			   to : "currentState" 
			}]
		}}
			{if (data.flow.currentState == "ongoing")}
				{section {
					id: "currentClasspath",
					bindRefreshTo : [{
					   inside : data.campaign,
					   to : "currentClasspath" 
					}]
				}}
					{var currentClasspath = data.campaign.currentClasspath/}
					<div id="currentTest">${currentClasspath}</div>
				{/section}
			{/if}
			{if (data.flow.currentState == "finished")}
				<div id="currentTest">0 undisposed objects (FAKE)</div>
			{/if}
		{/section}
	{/macro}
{/Template}