/*
 * Copyright Amadeus
 */
/**
 * @class aria.embed.EmbedLib
 * @extends aria.widgetLibs.WidgetLib
 * @singleton
 */
Aria.classDefinition({
	$classpath : 'aria.embed.EmbedLib',
	$extends : 'aria.widgetLibs.WidgetLib',
	$singleton : true,
	$prototype : {
		widgets : {
			"Element" : "aria.embed.Element"
		}
	}
});
