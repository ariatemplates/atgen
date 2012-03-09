/*
 * Copyright Amadeus
 */
/**
 * Pseudo random number generator.
 * Generates random numbers from a seed using a linear congruential generator.
 * @class aria.utils.Rand
 */
Aria.classDefinition({
	$classpath : "aria.utils.Rand",
	$singleton : true,
	$constructor : function (seed) {
		/**
		 * Modulus. Period length
		 * @type Number
		 */
		this.m = Math.pow(2, 48);
		
		/**
		 * Multiplier, must be greater than 0 and smaller than the modulus
		 * @type Number
		 */
		this.a = 25214903917;
		
		/**
		 * Increment
		 * @type Number
		 */
		this.c = 11;
		
		/**
		 * Last random number generated
		 * @type Number
		 */
		this.last = (seed == undefined) ? 12483 : seed;
	},
	$prototype : {
		/**
		 * Returns an integer number between 0 and 2^48 - 1
		 * Uniform distribution 
		 * @return {Number}
		 */
		rand : function () {
			var next = (this.a * this.last + this.c) % this.m;
			
			this.last = next;
			
			return next;
		},
		
		/**
		 * Returns a number between 0 and 1
		 * Uniform distribution
		 * @return {Number}
		 */
		rand01 : function () {
			var integer = this.rand();
			
			return integer / this.m;
		}
	}
});