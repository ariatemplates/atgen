/*
 * Copyright Amadeus
 */
Aria.classDefinition({
	$classpath : 'aria.templates.PublicWrapper',
	$constructor : function () {},
	$destructor : function () {},
	$prototype : {
		/**
		 * Classpath of the interface to be used as the public interface of this public wrapper.
		 * @type {String}
		 */
		$publicInterfaceName : null,

		/**
		 * Returns the public interface wrapper associated to an object.
		 * @return the public interface object
		 */
		$publicInterface : function () {
			return this.$interface(this.$publicInterfaceName);
		}
	}
});
