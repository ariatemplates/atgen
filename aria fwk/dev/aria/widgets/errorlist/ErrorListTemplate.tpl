/**
 * Copyright Amadeus
 */
{Template {
	$classpath:'aria.widgets.errorlist.ErrorListTemplate',
	$hasScript: true
}}

	{macro main()}
		{if data.messages.length > 0}
			{@aria:Div data.divCfg}
				{@aria:Icon {icon: getIcon()}/}
				<span style="padding: 3px 16px 3px 10px; font-weight: bold;">${data.title}</span>
				<div style="padding: 3px 0 0 0;">
					{call messagesList(data.messages)/}
				</div>
			{/@aria:Div}
		{/if}
	{/macro}
	
	{macro messagesList(messages, indentation)}
		<ul style="margin: 0 0 0 10px; padding-left: 10px;">
			{foreach msg inArray messages}
				<li style="list-style-type: square;">
				{if msg.metaDataRef}
					{@aria:Link {
						label: getDisplayMessage(msg),
						onclick: { fn: clickOnMessage, args: msg }
					}/}
				{else/}
					${getDisplayMessage(msg)}
				{/if}
				{if msg.subMessages}
					{call messagesList(msg.subMessages)/}
				{/if}
				</li>
			{/foreach}
		</ul>
	{/macro}

{/Template}