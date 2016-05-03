(function(){
	'use strict';
	angular.module('SharedComponents', [
		'_Authentication', //Service
		'_Rest', //Service
		'_DataConverter', //Service
		'_Storage', //Service
		'_Crud', //Service
		'_Alert', //Service
		'_Manager', //Provider
		'_Controllers', //Controller
		'_Filter', //Filter
		'_Directive', //Directive
		]);
})();