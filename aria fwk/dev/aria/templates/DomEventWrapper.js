/*
 * Copyright Amadeus
 */
/**
 * Wrapper class for DOM events to be passed to templates. Templates must not have direct access to the DOM, so the
 * DomEvent object cannot be passed directly. Instead, this wrapper object extends the DomEvent object by replacing DOM
 * references by wrappers on that references for safe DOM access.
 * @class aria.templates.DomEventWrapper
 */
Aria.classDefinition({
	$classpath : "aria.templates.DomEventWrapper",
	$extends : "aria.DomEvent",
	$dependencies : ["aria.templates.DomElementWrapper"],
	/**
	 * Build a DomEventWrapper object.
	 * @param {Object} domEvt DOM event object (passed directly)
	 */
	$constructor : function (domEvt) {
		var DomWrapper = aria.templates.DomElementWrapper;
		this.$DomEvent.constructor.call(this, domEvt);

    /**
     * Wrapper on the HTML element on which the event happened.
     * @type aria.DomWrapper
     */
		this.target = (this.target ? new DomWrapper(this.target) : null);

    /**
     * Wrapper on the HTML element from/to which the event is directed. (relatedTarget/fromElement/toElement)
     * @type aria.DomWrapper
     */
		this.relatedTarget = (this.relatedTarget ? new DomWrapper(this.relatedTarget) : null);
		// bind function to original scope so that "this" is preserved
		// Not needed as $DomEvent constructor creates these functions
		// this.stopPropagation = aria.utils.Function.bind(domEvt.stopPropagation, domEvt);
		// this.preventDefault = aria.utils.Function.bind(domEvt.preventDefault, domEvt);
	},
	$destructor : function () {
		if (this.target) {
			this.target.$dispose();
			this.target = null;
		}
		if (this.relatedTarget) {
			this.relatedTarget.$dispose();
			this.relatedTarget = null;
		}
		this.$DomEvent.$destructor.call(this);
	},
	$prototype : {
		/**
		 * Modify the target element of this event.
		 * @param {HTMLElement} target New event target
		 * @override
		 */
		setTarget : function (target) {
			if (this.target) {
				this.target.$dispose();
			}
			this.target = target ? new aria.templates.DomElementWrapper(target) : null;
		}
	}
});