/*
 * Copyright Amadeus
 */
/**
 * Helper to simulate a writer used in template context
 * @class aria.jsunit.helpers.OutObj
 */
Aria.classDefinition({
	$classpath : 'aria.jsunit.helpers.OutObj',
	$dependencies : ['aria.utils.Dom'],
	$singleton : true,
	$constructor : function () {
		this.testArea = aria.utils.Dom.getElementById("TESTAREA");
		this.store = "";
	},
	$destructor : function () {
		this.testArea = null;
		this.store = null;
	},
	$prototype : {
		tplCtxt : {
			createId : function (id) {
				return ["testOutput", id].join("_");
			},
			evalCallback : function (callback, arg) {
				return aria.jsunit.helpers.OutObj.$callback(callback, arg);
			}
		},
		write : function (str) {
			this.store += str;
		},
		putInDOM : function () {
			this.testArea.innerHTML = this.store;
		},
		clearAll : function () {
			this.testArea.innerHTML = "";
			this.store = "";
		}
	}
})