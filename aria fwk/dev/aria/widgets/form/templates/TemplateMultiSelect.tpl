/**
 * Copyright Amadeus
 */
// Default template for List Widget 
{Template {
	$classpath:'aria.widgets.form.templates.TemplateMultiSelect',
	$hasScript:true
}}
	{macro main()}
		// The Div is used to wrap the items with good looking border.
		{@aria:Div data.cfg}
				
				{section 'Items'}
					
					{if (data.displayOptions.flowOrientation == 'horizontal')}
						// with columns, horizontal
						<table>
						{foreach item inView data.itemsView}
					
							{if item_index % data.numberOfColumns == 0}
								<tr>
							{/if}
							<td>{call renderItem(item, item_info.initIndex)/}</td>
							
							{if (data.displayOptions.tableMode == true)}  
								{var checkboxLabelSplit = item.label.split('|')/}
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[0]}</td>
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[1]}</td>
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[2]}</td>
								<td {on click {fn: "itemTableClick", args: {	item : item, itemIdx : item.index }}/}>${checkboxLabelSplit[3]}</td>
							{/if} 
							
							{if (item_index + 1) % data.numberOfColumns == 0}
								</tr>
							{/if}
						{/foreach}
						</table>
					{elseif (data.displayOptions.flowOrientation == 'vertical')/}
					
						{var lineCount = data.numberOfRows /}
						{var columnCount = data.numberOfColumns /}
						{var outputCount = 0 /}
						{var outputRows = 1 /}

						<table>
							
						{for var i = 0 ; i < lineCount ; i++}
					
							<tr>
							{var lastColCount = 0 /}
							{for var j = 0 ; j < columnCount ; j++ }
								<td>
								{var itemIndex = (j*lineCount)+i/}					
								{if (itemIndex < data.itemsView.items.length)}
									{var item = data.itemsView.items[itemIndex].value/} 
									{call renderItem(item, itemIndex)/}
								{/if}
								{set outputCount = outputCount + 1/}
								</td>								
							{/for}
							{set outputRows = outputRows + 1/}
							</tr>
						{/for}
						</table>
					{else/}
					
						{foreach item inView data.itemsView}
							{call renderItem(item, item_info.initIndex)/}
						{/foreach}

					{/if}
					
				{/section}
				{if (data.displayOptions.displayFooter)}											
					{call footer()/}
				{/if}
		{/@aria:Div}
	{/macro}	
	
	{macro renderItem(item)}
 		
		{var checkboxLabel = "Error"/}
		{if (data.displayOptions.listDisplay == 'code')}
			{set checkboxLabel = item.value/}
		{elseif (data.displayOptions.listDisplay == 'label')/}
			{set checkboxLabel = item.label/}
		{elseif (data.displayOptions.listDisplay == 'both')/}
			{set checkboxLabel = item.label + " (" + item.value + ") " /}
		{/if}
		{if (data.displayOptions.tableMode == true)}  
			{set checkboxLabel = ""/}
		{/if} 
			
								
		{@aria:CheckBox {										
			label: checkboxLabel,				
			onchange: {
				fn: "itemClick",					
				args: {
					item : item,
					itemIdx : item.index
				}
			},	
			id: 'listItem' + item.index, 																						
			bind:{
				"value": {
					inside: item, to: 'selected'
				},
				"disabled" : {
					inside : item, to: "currentlyDisabled"
					}
			},
			value: item.selected
		}/}
		
	{/macro}
		
	{macro footer()}		
		<div class="${data.skin.cssClassFooter}">
			<div style="width:120px">
				{@aria:Link { 
					label : "Select All",
					sclass : 'multiSelectFooter',
					onclick : {
						fn : "selectAll",
						scope : moduleCtrl	
					}
				}/}
			</div>	
			<span style="position:absolute;right:2px;text-align:right;">		
				{@aria:Link { 
					label:"Close",
					sclass : 'multiSelectFooter',
					onclick: {
						fn: "close",
						scope: moduleCtrl
					}
				}/}						
			</span>				
			<span>
				{@aria:Link {
					label:"Deselect All",
					sclass : 'multiSelectFooter',
					onclick: {
						fn: "deselectAll",
						scope: moduleCtrl
					}
				}/}						
			</span>						
		</div>
	{/macro}
	
{/Template}
