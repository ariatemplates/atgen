/**
 * Copyright Amadeus
 */
// Default template for List Widget 
{Template {
	$classpath:'aria.widgets.form.list.templates.ListTemplate',
	$hasScript:true
}}
	{macro main()}
		// The Div is used to wrap the items with good looking border.
		{@aria:Div data.cfg}
				
				{section 'Items'}
				<div {id "myList" /}
					{if !data.disabled}
						{on mouseup {fn: "itemClick"} /}
						{on mouseover {fn: "itemMouseOver"} /}
					{/if} 
				>
					<a href="#" style="display: none;">&nbsp;</a> //IE6 does not highlight the 1 elm in list
					{foreach item inArray data.items}
						{call renderItem(item, item_index)/}
					{/foreach}
				</div>
				{/section}
		{/@aria:Div}
	{/macro}	
	
	{macro renderItem(item, itemIdx)}
		{var a = _getClassForItem(item)/}
	
		<a href="#" class="${a}" _itemIdx="${itemIdx}" onclick="return false;">
			{if ! item.label}
				&nbsp;
			{else/}
				${item.label|escape}
			{/if}
		</a>
	{/macro}
	
{/Template}
