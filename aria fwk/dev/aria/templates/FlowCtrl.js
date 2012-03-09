/*
 * Copyright Amadeus
 */
/**
 * Base class for flow controllers.
 * @class aria.templates.FlowCtrl
 */
Aria.classDefinition({
	$classpath : 'aria.templates.FlowCtrl',
	$extends : 'aria.templates.PublicWrapper',
	$implements : ['aria.templates.IFlowCtrl'],
	$dependencies : ['aria.utils.String'],
	$constructor : function () {
		this.$PublicWrapper.constructor.call(this);
	},
	$destructor : function () {
		this.moduleCtrl = null;
		this.data = null;
		this.$PublicWrapper.$destructor.call(this);
	},
	$prototype : {
		/**
		 * Classpath of the interface to be used as the public interface of this flow controller.
		 * @protected
		 * @type {String}
		 */
		$publicInterfaceName : 'aria.templates.IFlowCtrl',

		/**
		 * Interceptor dispatch function.
		 * @param {Object} param interceptor parameters
		 */
		interceptModuleCtrl : function (param) {	
			var methodName = aria.utils.String.capitalize(param.method);
			var fctRef = this["on" + methodName + param.step];
			if (fctRef) {
				return fctRef.call(this, param);
			}
			fctRef = this["on" + param.method + param.step];
			if (fctRef) {	 			
				return fctRef.call(this, param);				 
			}
		},

		/**
		 * Called when the flow controller is initialized, to set the module controller associated to this flow
		 * controller. Note that this is before the module controller init method has been called.
		 * @param {Object} moduleCtrl Public interface of the flow controller.
		 */
		setModuleCtrl : function (moduleCtrl) {
			this.moduleCtrl = moduleCtrl;
		},

		/**
		 * Interceptor on the callback of the init method of the module controller. It is used to set the data property
		 * on the flow controller.
		 */
		oninitCallback : function (param) {
			this.data = this.moduleCtrl.getData();
		}
	}
});