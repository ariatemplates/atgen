/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.filter.Filter',
	$hasScript:true,
	$width : {min:178},
	$height : {value:25},
	$css : ['aria.tester.runner.view.filter.FilterCSS']
}}
	{macro main()}
		{section {
			id: "filterSection",
  			bindRefreshTo : [{
			   inside : data.view.filter,
			   to : "type"
  			}],
  			type:"div"
  		}}
			<div {on click {
				fn : this.onFilterLinkClick,
				scope : this,
				args : {}
			}/} class="linkContainer" >
				<div 
					style="margin-left:10px"
					class="filterLink ${data.view.filter.type=='all' ? 'selected' : ''}" 
					title="display all tests"
					_type="all">
					All
				</div> 
				<div class="divider"></div> 
				<div 
					class="filterLink ${data.view.filter.type=='errors' ? 'selected' : ''}" 
					title="display tests with errors"
					_type="errors">
					Errors
				</div> 
				<div 
					class="filterLink ${data.view.filter.type=='warnings' ? 'selected' : ''}" 
					title="display tests with warnings"
					_type="warnings">
					Warnings
				</div>
			</div>
		{/section}
	{/macro}
{/Template}