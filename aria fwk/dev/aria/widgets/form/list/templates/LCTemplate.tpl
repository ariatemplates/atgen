/**
 * Copyright Amadeus
 */
// Default template LCResourceHandler
{Template {
	$classpath : 'aria.widgets.form.list.templates.LCTemplate',
	$extends : 'aria.widgets.form.list.templates.ListTemplate'
}}
	
	{macro renderItem(item, itemIdx)}
		{var className = _getClassForItem(item)/}
		{var entry = item.object.entry/}
	
		<a href="#" class="${className}" _itemIdx="${itemIdx}" onclick="return false;">
			{if ! item.label}
				&nbsp;
			{else/}
				${item.label|escape|startHighlight:entry}
			{/if}
		</a>
	{/macro}
	
{/Template}
