/**
 * Copyright Amadeus
 */
// TODOC
{Template {
	$classpath:'aria.tester.runner.view.links.Links',
	$hasScript:true,
	$width : {value:200},
	$height : {min:125},
	$css:['aria.tester.runner.view.links.LinksCSS']
}}
	{macro main()}	
		<h1>Links</h1>
		<ul class="container">
			{var topspotLinks = this.getTopspotLinks()/}
			{foreach link in topspotLinks} 
				<li class="item">
					<a 
						href="${link.href}" 
						target="_blank"
					>
						${link.title}
					</a>
				</li>
			{/foreach}
			{var keyboardShortcuts = getKeyboardShortcuts()/}
			{foreach link in keyboardShortcuts} 
				<li class="item">
					<a 
						{on click {
							fn : link.callback,
							scope : this						
						}/}
					>
						Press <b>${link.key}</b> : ${link.description}
					</a>
				</li>
			{/foreach}
		</ul>
	{/macro}
{/Template}