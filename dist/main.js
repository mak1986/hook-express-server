(function(){
	'use strict';
	angular.module('_Controllers', []);
})();

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

(function(){
	'use strict';
	angular.module('_Directive', []);
})();

(function(){
	'use strict';
	angular.module('_Filter', []);
})();

(function(){
	'use strict';
	angular.module('_Manager', []);
})();

(function(){
	'use strict';
	angular.module('_Alert', []);
})();

(function(){
	'use strict';
	angular.module('_Authentication', []);
})();

(function(){
	'use strict';
	angular.module('_Crud', []);
})();

(function(){
	'use strict';
	angular.module('_DataConverter', []);
})();

(function(){
	'use strict';
	angular.module('_Rest', []);
})();

(function(){
	'use strict';
	angular.module('_Storage', []);
})();

(function(){
	'use strict';

	var hookFormButton = function(){
		return {
			restrict: 'A',
			scope: {
				form: '=hookFormButtonBindForm',
				controller: '=hookFormButtonBindController'
			},
			templateUrl: 'shared/directive/form/button/hookFormButton.html',
		};
	};

	angular.module('_Directive')
	.directive('hookFormButton', hookFormButton);
})();

(function(){
	'use strict';

	var hookFormLabel = function(){
		return {
			restrict: 'A',
			scope: {
				form: '=hookFormLabelBindForm',
				field: '@hookFormLabelBindField',
				flag: '=hookFormLabelBindFlag',
				required: '@hookFormLabelBindRequired'
			},
			templateUrl: 'shared/directive/form/label/hookFormLabel.html',
		};
	};

	angular.module('_Directive')
	.directive('hookFormLabel', hookFormLabel);
})();

(function(){
	'use strict';

	var hookValidationMessage = function(){
		return {
			restrict: 'A',
			scope: {
				form: '=hookValidationMessageBindForm',
				field: '@hookValidationMessageBindField'
			},
			templateUrl: 'shared/directive/form/validation_message/hookValidationMessage.html',
		};
	};

	angular.module('_Directive')
	.directive('hookValidationMessage', hookValidationMessage);
})();

(function() {
  'use strict';

  function hookValidationEmail() {

    var regex = /^[\-a-zA-Z0-9_\.\!]+@[\-a-zA-Z0-9_\.\!]+$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;

        ctrl.$validators.email = function(){
          return true;
        }

        ctrl.$validators.hook_validation_email = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_email"] = {};


          if (ctrl.$isEmpty(value)) {

            ctrl.$setValidity('hook_validation_email', true);
            return true;

          }

          if (regex.test(value)) {

            ctrl.$setValidity('hook_validation_email', true);
            return true;

          } else {

            ctrl.$setValidity('hook_validation_email', false);
            return false;

          }
        }

      }
    };
  };

  hookValidationEmail.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationEmail', hookValidationEmail);
})();

(function() {
  'use strict';

  function hookValidationMaxLength() {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var maxLength = attrs.hookValidationMaxLength;
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_max_length = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_max_length"] = {
            "$field": 'label.'+field,
            "$max_length": maxLength
          }


          if (ctrl.$isEmpty(value)) {
            ctrl.$setValidity('hook_validation_max_length', true);
            return true;
          }

          if (value.length > maxLength) {

            ctrl.$setValidity('hook_validation_max_length', false);
            return false;

          } else {

            ctrl.$setValidity('hook_validation_max_length', true);
            return true;

          }
        }

      }
    };
  };

  hookValidationMaxLength.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationMaxLength', hookValidationMaxLength);
})();

(function() {
  'use strict';

  function hookValidationMinLength() {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var minLength = attrs.hookValidationMinLength;
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_min_length = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_min_length"] = {
            "$field": 'label.'+field,
            "$min_length": minLength
          }


          if (ctrl.$isEmpty(value)) {
            ctrl.$setValidity('hook_validation_min_length', true);
            return true;
          }

          if (value.length < minLength) {

            ctrl.$setValidity('hook_validation_min_length', false);
            return false;

          } else {

            ctrl.$setValidity('hook_validation_min_length', true);
            return true;

          }
        }

      }
    };
  };

  hookValidationMinLength.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationMinLength', hookValidationMinLength);
})();

(function() {
  'use strict';

  function hookValidationNoSpecialCharacters() {

    var regex = /^[a-zA-Z0-9_]+$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_no_special_characters = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_no_special_characters"] = {
            "$alphabets": "a-z A-Z",
            "$digits": "0-9",
            "$underscore": "_"
          }


          if (ctrl.$isEmpty(value)) {

            ctrl.$setValidity('hook_validation_no_special_characters', true);
            return true;

          }

          if (regex.test(value)) {

            ctrl.$setValidity('hook_validation_no_special_characters', true);
            return true;

          } else {

            ctrl.$setValidity('hook_validation_no_special_characters', false);
            return false;

          }
        }

      }
    };
  };

  hookValidationNoSpecialCharacters.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationNoSpecialCharacters', hookValidationNoSpecialCharacters);
})();

(function() {
  'use strict';

  function hookValidationNumber() {

    var regex = /^[0-9]*$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;

        ctrl.$validators.hook_validation_number = function(modelValue, viewValue) {
          var value = modelValue || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_number"] = {}

          if (ctrl.$isEmpty(value)) {

            ctrl.$setValidity('hook_validation_number', true);
            return true;

          }

          if (regex.test(value)) {

            ctrl.$setValidity('hook_validation_number', true);
            return true;

          } else {

            ctrl.$setValidity('hook_validation_number', false);
            return false;

          }
        }

      }
    };
  };

  hookValidationNumber.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationNumber', hookValidationNumber);
})();

(function() {
  'use strict';

  function hookValidationRequired() {

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;
        var form = scope.form;


        ctrl.$validators.hook_validation_required = function(modelValud, viewValue) {
          var value = modelValud || viewValue;

          if (!ctrl['$substitutions']) {
            ctrl['$substitutions'] = {};
          } 
          
          ctrl['$substitutions']["hook_validation_required"] = {
            "$field": 'label.'+field
          }


          if (ctrl.$isEmpty(value)) {
            ctrl.$setValidity('hook_validation_required', false);
            return false;
          }

          ctrl.$setValidity('hook_validation_required', true);
          return true;

        }

      }
    };
  };

  hookValidationRequired.$inject = [];

  angular.module('_Directive')
    .directive('hookValidationRequired', hookValidationRequired);
})();

(function() {
  'use strict';

  function hookValidationUnique(CONFIG, ResourceManager) {
    //function hookValidationUnique($q, $timeout){

    return {
      require: 'ngModel',
      scope: {
        controller: "=hookValidationUniqueBindController",
        model: "=hookValidationUniqueBindModel"
      },
      link: function(scope, elm, attrs, ctrl) {
        var field = attrs.name;

        if (!ctrl['$substitutions']) {
          ctrl['$substitutions'] = {};
        }

        ctrl['$substitutions']["hook_validation_unique"] = {
          "$field": 'label.'+field
        }

        ctrl.$asyncValidators[field] = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          var where = {};
          where[field] = value;
          return ResourceManager.readWhere(scope.controller.type, where).then(function(resources) {
            //console.log(resources);
            if (resources.length == 0) {

              ctrl.$setValidity('hook_validation_unique', true);
              return true;

            } else if (scope.controller.mode == "edit" && resources.length == 1 && resources[0].id == scope.model.id) {

              ctrl.$setValidity('hook_validation_unique', true);
              return true;

            } else {

              ctrl.$setValidity('hook_validation_unique', false);
              return false;

            }

          }, function(reason) {

            ctrl.$setValidity('hook_validation_unique', false);
            console.log("something went wrong");


            return undefined;

          });

        };

      }
    };
  };

  hookValidationUnique.$inject = [
    'CONFIG',
    'ResourceManager'
  ];

  angular.module('_Directive')
    .directive('hookValidationUnique', hookValidationUnique);
})();

(function(){
	'use strict';

	function hookActionButtonBoxTools(){
		return {
			restrict: 'A',
			scope: {
				controller: '=hookActionButtonBoxToolsBindController'
			},
			templateUrl: 'shared/directive/special/action_button/box_tools/hookActionButtonBoxTools.html',
		};
	};

	angular.module('_Directive')
	.directive('hookActionButtonBoxTools', hookActionButtonBoxTools);
})();

(function(){
	'use strict';

	function hookActionButtonList(){
		return {
			restrict: 'A',
			scope: {
				resource: '=hookActionButtonListBindResource',
				controller: '=hookActionButtonListBindController'
			},
			templateUrl: 'shared/directive/special/action_button/list/hookActionButtonList.html',
		};
	};

	angular.module('_Directive')
	.directive('hookActionButtonList', hookActionButtonList);
})();

(function(){
	'use strict';

	function hookSection(){
		
		return {
			restrict: 'A',
			scope: {	
				section: '=hookSectionBindModel',
				language: '&hookSectionBindLanguage',
				template: '&hookSectionBindTemplate'
			},
			template: '<section ng-include="template()"></section>'
		};
	};

	angular.module('_Directive')
	.directive('hookSection', hookSection);
})();

(function(){
	'use strict';

	function hookTranslationView(CONFIG){
		
		var relationshipsHasKey = function(type, key){
			var relationshipAlias;

			for(relationshipAlias in CONFIG.models[type].relationships){
				if(relationshipAlias == key){
					return true;
				}
			}

			return false;
		
		};

		var getTranslationFields = function(model){
			var translationFieldsModel = {};
			var relationshipAlias;
			var key;

			for(key in model){

				if(!relationshipsHasKey(model.type, key) && typeof model[key] == 'object'){
					translationFieldsModel[key] = model[key];
				}
			}

			return translationFieldsModel;
		};

		return {
			restrict: 'A',
			scope: {	
				model: '=hookTranslationViewBindModel',
				getLanguage: '&hookTranslationViewBindGetLanguage',
				getEnabledLanguages: '&hookTranslationViewBindGetEnabledLanguages'
			},
			templateUrl: 'shared/directive/special/translation_view/hookTranslationView.html',
			link: function(scope, element, attrs, ctrl){
				scope.translationFieldsModel = getTranslationFields(scope.model);
			}
		};
	};

	hookTranslationView.$inject = [
		'CONFIG'
	];

	angular.module('_Directive')
	.directive('hookTranslationView', hookTranslationView);
})();

(function() {
	'use strict';
	var hookFilterByCurrentSite = function($filter, UserInterface) {

		var filterName = "hookFilterByCurrentSite";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			var result;
			var objectId;
			var siteId;

			if (UserInterface.site != null) {
				result = [];

				for (objectId in input) {
					for (siteId in (input[objectId]['sites'] || input[objectId]['site'])) {
						if (siteId == UserInterface.site.id) {
							result.push(input[objectId]);
							break;
						}
					}
				}
			} else {
				result = input;
			}

			return result;
		}
	};

	hookFilterByCurrentSite.$inject = [
		'$filter',
		'UserInterface'
	];

	angular.module('_Filter')
		.filter('hookFilterByCurrentSite', hookFilterByCurrentSite);

})();

(function() {
  'use strict';

  	// Don't use inBlackListFilter !! UserInterface setup is depended on this filter. 
 	var hookFilterByFieldValue = function($filter) {

		return function(input, attr) {
			if(input){
				return input[Object.keys(input)[0]][attr];
			}
			return input;
    	}
	};

	hookFilterByFieldValue.$inject = [
		'$filter'
	];

	angular.module('_Filter')
	.filter('hookFilterByFieldValue', hookFilterByFieldValue);

})();

(function() {
  'use strict';

  	// Don't use inBlackListFilter !! UserInterface setup is depended on this filter. 
 	var hookFilterByFirstRelationship = function($filter) {

		return function(input) {
			if(input){
				return input[Object.keys(input)[0]];
			}
			return input;
    	}
	};

	hookFilterByFirstRelationship.$inject = [
		'$filter'
	];

	angular.module('_Filter')
	.filter('hookFilterByFirstRelationship', hookFilterByFirstRelationship);

})();

(function() {
	'use strict';
	var hookFilterByGroupId = function($filter, Authentication) {

		var filterName = "hookFilterByGroupId";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			var key;
			var result;
			var groupId;
			var result = [];

			for (key in input) {
				for (groupId in input[key].groups) {
					if (Authentication.user.groups[groupId]) {
						result.push(input[key]);
						break;
					}
				}
			}

			return result;
		}
	};

	hookFilterByGroupId.$inject = [
		'$filter',
		'Authentication'
	];

	angular.module('_Filter')
		.filter('hookFilterByGroupId', hookFilterByGroupId);

})();

(function() {
  'use strict';
 	var hookFilterCapitalize = function($filter) {
 		var filterName = "hookFilterCapitalize";
 		
		return function(input) {
			
			if($filter('hookFilterInBlackListFilters')(filterName)){
				return input;
			}

			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    	}
	};
	hookFilterCapitalize.$inject = [
		'$filter'
	];
	angular.module('_Filter')
	.filter('hookFilterCapitalize', hookFilterCapitalize);

})();

(function() {
	'use strict';

	var hookFilterContentTranslate = function($filter, UserInterface) {

		var filterName = "hookFilterContentTranslate";

		return function(input, language) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			if(input == undefined || input == ''){
				return $filter('hookFilterMachineNameTranslate')('ui.no_translation_yet');
			}else{
				if(input[language]){
					return input[language];
				}else{
					return input[UserInterface.getLanguage()];
				}
			}
		}
	};

	hookFilterContentTranslate.$inject = [
		'$filter',
		'UserInterface'
	];

	angular.module('_Filter')
		.filter('hookFilterContentTranslate', hookFilterContentTranslate);

})();

(function() {
	'use strict';
	// has not been used yet.
	var hookFilterCount = function($filter) {

		var filterName = "hookFilterCount";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			if(input){
				return Object.keys(input).length;
			}else{
				return 0;
			}
		}
	};

	hookFilterCount.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterCount', hookFilterCount);

})();

(function() {
  'use strict';
 	var hookFilterInBlackListFilters = function(CONFIG, UserInterface) {

		return function(input) {
			var blacklistFilters = CONFIG.languages[UserInterface.getLanguage()].blacklist_filters;
			var key;

			for(key in blacklistFilters){
				if(input == blacklistFilters[key]){
					return true;
				}
			}
			return false;
    	}
	};

	hookFilterInBlackListFilters.$inject = [
		'CONFIG',
		'UserInterface'
	];

	angular.module('_Filter')
	.filter('hookFilterInBlackListFilters', hookFilterInBlackListFilters);

})();

(function() {
	'use strict';
	var hookFilterMachineNameTranslate = function($filter, ResourceManager, UserInterface) {

		var filterName = "hookFilterMachineNameTranslate";

		var filter =  function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			
			var key
			//console.log('in filter translate', input);
			if (typeof input == 'object') {

				for(key in input){
					input[key] = $filter('hookFilterMachineNameTranslate')(input[key]);
				}
				return input;
			
			} else {

				var machineNames = ResourceManager.readFromStorage('machine_name');
				var machineNameId;
				var machineName;
				var machineNameTranslationId;
				var machineNameTranslation;
				var language = UserInterface.getLanguage();
				var result = input;

				for (machineNameId in machineNames) {

					machineName = machineNames[machineNameId];

					if (machineName.name == input) {

						for (machineNameTranslationId in machineName.translations) {

							machineNameTranslation = machineName.translations[machineNameTranslationId];

							if (language == $filter('hookFilterByFieldValue')(machineNameTranslation.language, 'iso_2_code')) {

								return machineNameTranslation.translation;

							}

						}

					}

				}
				//console.log('in filter after translate', input);

				return input;
			}
		};

		filter.$stateful = true;

		return filter;
	};

	hookFilterMachineNameTranslate.$inject = [
		'$filter',
		'ResourceManager',
		'UserInterface'
	];
	


	angular.module('_Filter')
		.filter('hookFilterMachineNameTranslate', hookFilterMachineNameTranslate);

})();

(function() {
	'use strict';
	var hookFilterReplace = function($filter) {

		var filterName = "hookFilterReplace";

		return function(input, arg1, arg2) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			if (typeof arg1 == 'object') {
				for (var key in arg1) {
					input = $filter('hookFilterReplace')(input, key, arg1[key]);
				}
				return input;
			} else {
				return input.replace(arg1, arg2);
			}
		}
	};

	hookFilterReplace.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterReplace', hookFilterReplace);

})();

(function() {
	'use strict';
	var hookFilterSidebar = function($filter, Authentication) {

		var filterName = "hookFilterSidebar";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}


			var key;
			var result;
			var groupId;
			var result = [];

			for (key in input) {
				for (groupId in input[key].groups) {
					if (Authentication.user.groups[groupId]) {
						result.push(input[key]);
						break;
					}
				}
			}

			return result;
		}
	};

	hookFilterSidebar.$inject = [
		'$filter',
		'Authentication'
	];

	angular.module('_Filter')
		.filter('hookFilterSidebar', hookFilterSidebar);

})();

(function() {
	'use strict';
	var hookFilterTitle = function($filter) {

		var filterName = "hookFilterTitle";

		return function(input) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}

			var words = input.split(" ");
			var key;
			var result = [];

			for (key in words) {
				result.push($filter('hookFilterCapitalize')(words[key]));
			}
			return result.join(" ");
		}
	};

	hookFilterTitle.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterTitle', hookFilterTitle);

})();

(function() {
	'use strict';
	var hookFilterVat = function($filter) {

		var filterName = "hookFilterVat";
		var vat = 1.07;

		return function(input, option) {

			if ($filter('hookFilterInBlackListFilters')(filterName)) {
				return input;
			}
			if(option == 'exclude'){
				return Math.round(input/vat*100)/100;
			}else if(option == 'vat'){
				return Math.round((input - $filter('hookFilterVat')(input,'exclude'))*100)/100;
			}

		}
	};

	hookFilterVat.$inject = [
		'$filter'
	];

	angular.module('_Filter')
		.filter('hookFilterVat', hookFilterVat);

})();

(function() {
  'use strict';
  var orderObjectBy = function($filter) {

    var filterName = "orderObjectBy";

    return function(items, field, reverse) {

      if ($filter('hookFilterInBlackListFilters')(filterName)) {
        return input;
      }

      var filtered = [];

      angular.forEach(items, function(item) {
        filtered.push(item);
      });

      filtered.sort(function(a, b) {
        return (a[field] > b[field] ? 1 : -1);
      });

      if (reverse) filtered.reverse();

      return filtered;

    };

  }

  orderObjectBy.$inject = [
    '$filter'
  ];

  angular
    .module('_Filter')
    .filter('orderObjectBy', orderObjectBy);
})();

(function() {
	'use strict';

	function ResourceManager($q, CONFIG, converterService, restService, storageService) {
		var converter = converterService;
		var rest = restService;
		var storage = storageService;

		this.create = function(resource) {
			var promise;
			var resources;
			var jsonApi = converter.toJsonApi(resource);
			// console.log('in Manager create');
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.post;
				promise = rest.post(apiUrl, jsonApi);
				promise.then(function(data) {

					resources = converter.toResourceArray(data);

					storage.insert(resources);

					resolve(storage.get(resource.type)[data.data.data.id]);

				}, function(reason) {

					reject(reason);

				});

			});
		};


		this.read = function(type) {
			var promise;
			var resources;
			//console.log('in Manager read');
			return $q(function(resolve, reject) {

				if (storage.count(type) !== 0) {

					resolve(storage.get(type));

				} else {
					var apiUrl = CONFIG.url.api + CONFIG.models[type].api.get.all
					promise = rest.get(apiUrl);
					promise.then(function(data) {

						resources = converter.toResourceArray(data);
						storage.insert(resources);
						resolve(storage.get(type));

					}, function(reason) {

						reject(reason);

					});
				}

			});
		};

		this.readById = function(type, id) {
			var promise;
			var resources;
			//console.log('in Manager readById');
			return $q(function(resolve, reject) {
				if (storage.get(type)[id] && storage.get(type)[id] !== null) {

					resolve(storage.get(type)[id]);

				} else {
					var apiUrl = CONFIG.url.api + CONFIG.models[type].api.get.one.replace(':id', id);
					promise = rest.get(apiUrl);
					promise.then(function(data) {

						resources = converter.toResourceArray(data);
						storage.insert(resources);
						resolve(storage.get(type)[id]);

					}, function(reason) {

						reject(reason);

					});
				}

			});
		};

		this.update = function(resource) {
			var promise;
			var jsonApi = converter.toJsonApi(resource);
			console.log('before patch',resource);
			//console.log('in Manager update');
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.patch.replace(':id', resource.id);
				promise = rest.patch(apiUrl, jsonApi);
				promise.then(function(data) {
					storage.update(resource);
					console.log('after patch', resource);
					resolve(storage.get(resource.type)[resource.id]);

				}, function(reason) {

					reject(reason);

				});

			});
		};

		this.delete = function(resource) {
			var promise;
			//console.log('in Manager delete');
			return $q(function(resolve, reject) {

				var apiUrl = CONFIG.url.api + CONFIG.models[resource.type].api.delete.replace(':id', resource.id);
				promise = rest.delete(apiUrl);
				promise.then(function(data) {

					storage.delete(resource);
					resolve();

				}, function(reason) {

					reject(reason);

				});

			});
		};

		this.readFromStorage = function(type, id) {
			if (!id) {
				return storage.get(type);
			} else {
				return storage.get(type)[id];
			}
		}
		
		// this.deleteFromStorage = function(resource) {
		// 	return storage.delete(resource);
		// }
		
		this.shallowCopy = function(resource) {
			var obj = {};
			var attr;
			var relationshipResourceId;

			for (attr in resource) {
				if (!(attr in CONFIG.models[resource.type].relationships)) {

					if(typeof resource[attr] == 'object'){

						obj[attr] = angular.copy(resource[attr]);

					}else{
					
						obj[attr] = resource[attr];
					
					}
				
				} else {
					if (CONFIG.models[resource.type].relationships[attr].isArray) {
						for (relationshipResourceId in resource[attr]) {
							if (!obj[attr]) {
								obj[attr] = {};
							}
							obj[attr][relationshipResourceId] = true;
						}
					} else {
						for (relationshipResourceId in resource[attr]) {
							obj[attr] = {
								id: relationshipResourceId
							};
						}
					}
				}
			}

			return obj;
		}

		this.deepCopy = function(resource) {
			return angular.copy(resource);
		}

		this.readWhere = function(type, where) {
			var promise;
			var resources;

			//console.log('in Manager update');
			return $q(function(resolve, reject) {
				var apiUrl = converter.getUrlWhere(type, where);
				promise = rest.get(apiUrl);
				promise.then(function(data) {
					resources = converter.toResourceArray(data);
					resolve(resources);

				}, function(reason) {

					reject(reason);

				});

			});
		};
	}


	function ResourceManagerProvider() {
		var converter, rest, storage;

		this.setConverter = function(converterService) {
			converter = converterService;
		};
		this.setRest = function(restService) {
			rest = restService;
		};
		this.setStorage = function(storageService) {
			storage = storageService;
		};

		var Manager = function($injector, $q, CONFIG) {
			return new ResourceManager($q, CONFIG, $injector.get(converter), $injector.get(rest), $injector.get(storage));
		};

		this.$get = ['$injector', '$q', 'CONFIG', Manager];
	}



	angular
		.module('_Manager')
		.provider('ResourceManager', ResourceManagerProvider);

})();

(function() {
	'use strict';

	function Alert($filter, $rootScope) {

		var service = this;
		var queue = [];
		
		$rootScope.$on('$locationChangeSuccess', function() {
			if (queue.length > 0) {
				setAlert(queue.pop());
			} else {
				service.reset();
			}
		});

		this.setSuccessMessage = function(subject, action, redirect) {
			var alert = {};

			alert.active = true;
			alert.type = "success";
			alert.icon = "fa-check";
			alert.title = $filter('hookFilterMachineNameTranslate')('ui.success_title');
			alert.body = $filter('hookFilterReplace')(
				$filter('hookFilterMachineNameTranslate')('ui.success_body'), {
					'$subject': $filter('hookFilterCapitalize')($filter('hookFilterMachineNameTranslate')(subject)),
					'$action': $filter('hookFilterMachineNameTranslate')(action)
			});

			if (redirect == true) {
				queue.push(alert);
			}

			setAlert(alert);
		};

		this.setErrorMessage = function(redirect) {
			var alert = {};

			alert.active = true;
			alert.type = "danger";
			alert.icon = "fa-ban";
			alert.title = $filter('hookFilterMachineNameTranslate')('ui.error_title');
			alert.body = $filter('hookFilterMachineNameTranslate')('ui.error_body');
			if (redirect == true) {
				queue.push(alert);
			}
			setAlert(alert);
		};

		this.reset = function() {
			this.active = false;
			this.icon = "";
			this.type = "";
			this.title = "";
			this.body = "";
		};

		this.reset();
		
		var setAlert = function(alert) {
			var key;

			for (key in alert) {
				service[key] = alert[key];
			}
		};
	}

	Alert.$inject = [
		'$filter',
		'$rootScope'
	];

	angular
		.module('_Alert')
		.service('Alert', Alert);
})();

(function() {
	'use strict';

	function Authentication($filter, $location, $rootScope, $window, CONFIG, ResourceManager, UserInterface) {

		var service = this;
		// uncomment for real login
		// var userId;
		// service.isLoggedIn = false;
		


		service.login = function(login) {
			var where = {};

			ResourceManager.readWhere("user", login).then(function(resources) {
				if (resources.length == 0) {
					console.log("wrong login");
				} else if (resources.length == 1) {
					console.log("login succes");
					userId = resources[0].id;
					service.retrieveData();
				}

			}, function(reason) {

				console.log("something went wrong");

			});
		};

		service.logout = function() {
			$window.location.reload();
		};
		
		service.setup = function(){
			//set user
			service.user = ResourceManager.readFromStorage('user')[userId];
			UserInterface.setUser(service.user);

			//set default site
			if(!service.hasGroup('group.super_admin')){
				var site = service.user.sites[Object.keys(service.user.sites)[0]];
				UserInterface.setSite(site);
				$location.path("/accommodation/list");
			}else{
				$location.path("/site/list");
			}
		};

		service.retrieveData = function() {
			// Retrieve all data from server
			var count = 0;
			var modelsCount = Object.keys(CONFIG.models).length;
			var type;
			for (type in CONFIG.models) {
				ResourceManager.read(type).then(function(data) {
					//console.log("get a model success.")
					count++;

					if(count==modelsCount){
						service.isLoggedIn = true;
						service.setup();
					}
				
				}, function(errorData) {
					console.log("get a model fail.", errorData);
				});
			}
		};

		service.hasGroup = function(machineName){
			var id;

			for(id in service.user.groups){
				if($filter('hookFilterByFieldValue')(service.user.groups[id].machineName, 'name') == machineName){
					return true;
				}
			}

			return false;
		};

		//comment for real login
		var userId = 1;
		service.isLiggedIn = true;
		service.retrieveData();
	}

	Authentication.$inject = [
		'$filter',
		'$location',
		'$rootScope',
		'$window',
		'CONFIG',
		'ResourceManager',
		'UserInterface'
	];

	angular
		.module('_Authentication')
		.service('Authentication', Authentication);
})();

(function() {
	'use strict';

	function CrudUtility($location, $routeParams, CONFIG, Alert, ResourceManager) {

		this.init = function(vm, type) {
			//console.log("in init");

			// set model type
			vm["type"] = type;
			vm["type_dash"] = type.split("_").join("-").replace('--','-');
			vm["type_singular"] = CONFIG.models[type].singular;
			vm["type_plural"] = CONFIG.models[type].plural;

			// Mode can either be list, show, create or edit. 
			// It will be set corresponding to which CrudUtility functions is called.  
			vm["mode"] = "";

			// use in edit mode
			vm["selected"] = {}

			// set resources
			vm[vm["type_plural"]] = ResourceManager.readFromStorage(type);

			return vm;

		}

		this.list = function(vm, type) {
			setMode(vm, 'list');
		};

		this.show = function(vm, type) {
			setMode(vm, 'show');
			vm[vm["type_singular"]] = ResourceManager.readFromStorage(type, $routeParams.id);
			//console.log(vm);
		};

		this.form = function(vm, type) {
			//console.log(vm['site']);
			if ($routeParams.mode == 'edit') {
				this.edit(vm, type);
			} else if ($routeParams.mode == 'create') {
				this.create(vm, type);
			}
		};

		this.create = function(vm, type) {
			setMode(vm, 'create');
		};


		this.edit = function(vm, type) {
			var relationshipsBlueprint = CONFIG.models[type].relationships;
			var resource = ResourceManager.readFromStorage(type, $routeParams.id)

			setMode(vm, 'edit');
			vm[vm['type_singular']] = ResourceManager.shallowCopy(resource);
			//console.log(vm[vm['type_singular']]);
		};

		this.store = function(vm, type, resource, stayOnPage) {
			resource["type"] = type;
			//console.log(resource);
			resource = prepareSubmittedData(resource);

			ResourceManager.create(resource)
				.then(function(newResource) {

					if (stayOnPage) {
						Alert.setSuccessMessage('model.' + type, "ui.stored", false);
						$location.path();
					} else {
						Alert.setSuccessMessage('model.' + type, "ui.stored", true);
						$location.path('/' + vm["type_dash"] + '/show/' + newResource.id);
					}

				}, function(reason) {
					Alert.setErrorMessage(false);
					$location.path();

				});
		};

		this.update = function(vm, type, resource, stayOnPage) {
			var edit = this.edit;

			resource = prepareSubmittedData(resource);

			ResourceManager.update(resource)
				.then(function() {
					//edit(vm, type);
					if (stayOnPage) {
						Alert.setSuccessMessage('model.' + type, "ui.updated", false);
						$location.path();
					} else {
						Alert.setSuccessMessage('model.' + type, "ui.updated", true);
						$location.path("/" + vm["type_dash"] + "/list");
					}
				}, function(reason) {
					Alert.setErrorMessage(false);
					$location.path();
				});
		};

		this.destroy = function(vm, type, resource) {
			ResourceManager.delete(resource)
				.then(function() {
					if ($location.path() == "/" + vm["type_dash"] + "/list") {
						Alert.setSuccessMessage('model.' + type, "ui.deleted", false);
					} else {
						Alert.setSuccessMessage('model.' + type, "ui.deleted", true);
					}
					$location.path("/" + vm["type_dash"] + "/list");
				}, function(reason) {
					Alert.setErrorMessage(false);
					// $location.path();
				});
		};

		var setMode = function(vm, mode) {
			vm['mode'] = mode;
		};

		var prepareSubmittedData = function(resource) {
			var attr;
			var id;
			var relationships = CONFIG.models[resource.type].relationships;
			var relationshipModelType;

			if (resource['$$hashKey']) {
				delete resource['$$hashKey'];
			}

			for (attr in resource) {
				if (attr in relationships) {
					relationshipModelType = relationships[attr].type;
					if (CONFIG.models[resource.type].relationships[attr].isArray) {
						for (id in resource[attr]) {
							if (resource[attr][id] == true) {
								resource[attr][id] = ResourceManager.readFromStorage(relationshipModelType, id);
							} else {
								delete resource[attr][id];
							}
						}
						if (resource[attr].length == 0) {
							delete resource[attr];
						}
					} else {
						//edit
						if (resource[attr].id) {
							id = resource[attr].id;
						} else {
							//create
							id = resource[attr];
							resource[attr] = {};
						}
						resource[attr][id] = ResourceManager.readFromStorage(relationshipModelType, id);
						delete resource[attr].id;
					}
				} else {

					if (CONFIG.models[resource.type].structure[attr] && CONFIG.models[resource.type].structure[attr].type == 'boolean') {
						resource[attr] = (resource[attr] == "true" || resource[attr] == "1");
					}
				}

			}

			return resource;

		};
	}

	CrudUtility.$inject = [
		'$location',
		'$routeParams',
		'CONFIG',
		'Alert',
		'ResourceManager'
	];

	angular
		.module('_Crud')
		.service('CrudUtility', CrudUtility);
})();

(function() {
	'use strict';

	function JsonApiResourceConverter(CONFIG) {

		this.toJsonApi = function(resource) {
			var i;
			var resourceKey;
			var refKey;
			var jsonApi = {
				"data": {}
			};

			for (resourceKey in resource) {
				if (resourceKey === 'id' || resourceKey === 'type') {
					jsonApi.data[resourceKey] = resource[resourceKey];
				} else if (resourceKey in CONFIG.models[resource.type].relationships) {
					if (!jsonApi.data.relationships) {
						jsonApi.data['relationships'] = {};
					}
					if (!jsonApi.data.relationships[resourceKey]) {
						jsonApi.data.relationships[resourceKey] = {};
						jsonApi.data.relationships[resourceKey]['data'] = [];
					}
					for (refKey in resource[resourceKey]) {
						jsonApi.data.relationships[resourceKey].data.push({
							'type': CONFIG.models[resource.type].relationships[resourceKey].type,
							'id': resource[resourceKey][refKey].id
						});
					}

				} else {
					if (!jsonApi.data.attributes) {
						jsonApi.data['attributes'] = {};
					}
					jsonApi.data.attributes[resourceKey] = resource[resourceKey];
				}
			}

			return jsonApi;
		};

		this.toResourceArray = function(jsonApi) {

			var result = [];
			var mainResult = this.toResourceArrayByLevel(jsonApi, 'data');
			result.push.apply(result, mainResult);
			var refResult = this.toResourceArrayByLevel(jsonApi, 'included');
			result.push.apply(result, refResult);

			return result;

		};

		this.toResourceArrayByLevel = function(jsonApi, level) {

			var data;
			var index;
			var resource;
			var result = [];

			if (!(level in jsonApi.data)) {
				return result;
			}

			data = jsonApi.data[level];

			if (Object.prototype.toString.call(data) === '[object Array]') {
				for (index in data) {
					resource = toResource(data[index]);
					result.push(resource);
				}
			} else {
				resource = toResource(data);
				result.push(resource);
			}

			return result;

		};

		this.getUrlWhere = function(modelType, where) {
			var field;
			var count = 1;
			var whereStatement = "";
			for (field in where) {
				if(count > 1){
					whereStatement += "&";
				}
				whereStatement += "filter[" + field + "]=" + where[field];
				count++;
			}
			return CONFIG.url.api + "/" + modelType + "?" + whereStatement;
		};

		var toResource = function(data) {

			var resource = {
				id: data.id,
				type: data.type,
			};

			resource = attachAttibutes(resource, data);
			resource = attachRelationshipsKeys(resource, data);

			return resource;

		};

		var attachAttibutes = function(resource, data) {

			var attrKey;

			if ('attributes' in data) {
				for (attrKey in data.attributes) {
					resource[attrKey] = data.attributes[attrKey];
				}
			}

			return resource;
		};

		var attachRelationshipsKeys = function(resource, data) {
			var relationName;
			var relatedData;
			var relationIndex;

			if ('relationships' in data) {
				for (relationName in data.relationships) {
					if (data["relationships"][relationName]["data"]) {
						relatedData = data.relationships[relationName].data;
						resource[relationName] = {};
						if (relatedData instanceof Array) {
							for (relationIndex in relatedData) {
								resource[relationName][relatedData[relationIndex].id] = null;
							}
						} else {
							resource[relationName][relatedData.id] = null;
						}
					}
				}
			}

			return resource;
		};
	}

	JsonApiResourceConverter.$inject = [
		'CONFIG'
	];

	angular
		.module('_DataConverter')
		.service('JsonApiResourceConverter', JsonApiResourceConverter);
})();

(function() {
	'use strict';

	function JsonApiRest($http) {
			
		var contentType = 'application/vnd.api+json';
		
		this.post = function(url, data) {
			return this.request('POST', url, {'Accept': contentType, 'Content-Type':contentType }, data);
		};
		
		this.get = function(url) {
			return this.request('GET', url, {'Accept': contentType });
		};

		this.patch = function(url, data) {
			return this.request('PATCH', url, {'Accept': contentType, 'Content-Type':contentType }, data);
		};

		this.delete = function(url) {
			return this.request('DELETE', url, {'Accept': contentType });
		};

		this.request = function(method, url, headers, data){
			var request = {};
				request.method = method;
				request.url = url;
				request.headers = headers;
			if(data){
				request.data = data;
			}
			return $http(request);
		};
	}

	JsonApiRest.$inject = [
		'$http'
	];

	angular
		.module('_Rest')
		.service('JsonApiRest', JsonApiRest);
})();

(function() {
	'use strict';

	function ResourceStorage($cacheFactory, CONFIG) {

		var storage;

		this.init = function() {
			storage = $cacheFactory('models_storage');
			for (var key in CONFIG.models) {
				storage.put(key, {});
			}
		};

		this.init();

		this.count = function(model) {
			return Object.keys(storage.get(model)).length;
		};

		this.get = function(model) {
			return storage.get(model);
		};

		this.insert = function(resources) {

			for (var i in resources) {

				if (!storage.get(resources[i].type)[resources[i].id]) {
					createStandardResource(resources[i].type, resources[i].id);
				}

				this.update(resources[i]);

			}
		};

		this.update = function(resource) {
			updateAttr(resource);
			updateRef(resource);
		};

		this.delete = function(resource) {
			deleteResource(resource);
		};

		var entangle = function(modelTypes) {
			var modelType;
			var resources;
			var resourceId;
			var relationships;
			var relationshipAlias;
			var relationshipModelType;

			for (var i = 0; i < modelTypes.length; i++) {
				modelType = modelTypes[i];
				resources = storage.get(modelType);

				for (resourceId in resources) {

					relationships = getRelationships(resources[resourceId]);

					for (relationshipAlias in relationships) {

						relationshipModelType = CONFIG.models[modelType].relationships[relationshipAlias].type;

						entangleRelationship(resources[resourceId], relationships[relationshipAlias], relationshipModelType);

					}

				}

			}

		};

		//Updating a Resource's Attributes
		var updateAttr = function(resource) {
			var master = storage.get(resource.type)[resource.id];
			var attr;

			for (attr in resource) {
				if (!(attr in CONFIG.models[resource.type].relationships)) {
					master[attr] = resource[attr];
				}
			}
		};

		//Updating a Resource's Relationships. Performs a complete replacement only for relationships which are included in param.
		var updateRef = function(newResource) {
			var relationshipAlias;
			var oldResource = storage.get(newResource.type)[newResource.id];
			var oldRelationship;
			var newRelationship;
			var id;
			var alias;
			var relationshipModelType;
			var relationshipsBlueprint = CONFIG.models[newResource.type].relationships;
			var relationshipResource;
			var relationshipRelationshipsBlueprint;

			for (relationshipAlias in getRelationships(newResource)) {

				oldRelationship = oldResource[relationshipAlias];
				newRelationship = newResource[relationshipAlias];

				// replace with unentangled relationships.
				oldResource[relationshipAlias] = newRelationship;

				relationshipModelType = relationshipsBlueprint[relationshipAlias].type;

				entangleRelationship(oldResource, oldResource[relationshipAlias], relationshipModelType);

				alias = getAliasByModelType(relationshipModelType, oldResource.type);

				for (id in newRelationship) {
					if (!(id in oldRelationship)) {
						if (alias) oldResource[relationshipAlias][id][alias][oldResource.id] = oldResource;
					}
				}

				for (id in oldRelationship) {
					if (!(id in newRelationship)) {

						if (alias) {
							relationshipResource = storage.get(relationshipModelType)[id];
							relationshipRelationshipsBlueprint = CONFIG.models[relationshipResource.type].relationships;

							delete relationshipResource[alias][oldResource.id];

							if (relationshipRelationshipsBlueprint[alias].cascadeDelete) {
								deleteResource(relationshipResource);
							}
						}
					}
				}

			}
		};

		var deleteResource = function(resource) {
			var resource = storage.get(resource.type)[resource.id];
			var relationshipsBlueprint = CONFIG.models[resource.type].relationships;
			var relationshipAlias;
			var relationship;
			var relationshipModelType;
			var alias;
			var id;
			var relationshipResource;
			var relationshipRelationshipsBlueprint;

			for (relationshipAlias in getRelationships(resource)) {

				relationship = resource[relationshipAlias];

				relationshipModelType = relationshipsBlueprint[relationshipAlias].type;

				alias = getAliasByModelType(relationshipModelType, resource.type);

				for (id in relationship) {
					if (alias) {
						relationshipResource = storage.get(relationshipModelType)[id];
						relationshipRelationshipsBlueprint = CONFIG.models[relationshipResource.type].relationships;

						delete relationshipResource[alias][resource.id];

						if (relationshipRelationshipsBlueprint[alias].cascadeDelete) {
							deleteResource(relationshipResource);
						}
					}
				}

			}

			delete storage.get(resource.type)[resource.id];

		};
		var getAliasByModelType = function(modelType, relationshipModelType) {
			var alias;
			var relationshipAliases = CONFIG.models[modelType].relationships;

			for (alias in relationshipAliases) {
				if (relationshipAliases[alias].type == relationshipModelType) {
					return alias;
				}
			}

			return null;
		};

		var getRelationships = function(resource) {
			var attr;
			var relationshipsBlueprint = CONFIG.models[resource.type].relationships;
			var relationships = {};

			for (attr in resource) {
				if (attr in relationshipsBlueprint) {
					relationships[attr] = resource[attr];
				}
			}

			return relationships;
		};

		var entangleRelationship = function(resource, relationship, relationshipModelType) {
			var id;
			var alias = getAliasByModelType(relationshipModelType, resource.type);

			for (id in relationship) {
				if (!storage.get(relationshipModelType)[id]) {
					createStandardResource(relationshipModelType, id);
				}

				var relationshipResource = storage.get(relationshipModelType)[id];

				if (!relationshipResource[alias]) {
					relationshipResource[alias] = {};
				}

				if (!relationshipResource[alias][resource.id] || relationshipResource[alias][resource.id] == null) {
					relationshipResource[alias][resource.id] = storage.get(resource.type)[resource.id];
				}

				relationship[id] = storage.get(relationshipModelType)[id];
			}
		};

		var createStandardResource = function(type, id) {
			var relationshipAlias;

			storage.get(type)[id] = {
				'id': id,
				'type': type
			};

			for (relationshipAlias in CONFIG.models[type].relationships) {
				storage.get(type)[id][relationshipAlias] = {};
			}
		};
	}

	ResourceStorage.$inject = [
		'$cacheFactory',
		'CONFIG'
	];

	angular
		.module('_Storage')
		.service('ResourceStorage', ResourceStorage);
})();

// entangleRelationship(modelType, resourceId, relationships[relationshipAlias], relationshipModelType);
// var entangleRelationship = function(modelType, resourceId, relationship, relationshipModelType) {
// 		var id;

// 		for (id in relationship) {
// 			if (!storage.get(relationshipModelType)[id] && IS FOREIGN KEY RELATION {
// 					var newRelationObject = {};
// 					newRelationObject.type = relationshipModelType;
// 					newRelationObject.id = id;
// 					// modelTYpe SHOULD BE ALIAS
// 					newRelationObject[modelType] = storage.get(modelType)[resourceId];
// 					storage.get(relationshipModelType)[id] = newRelationObject;
// 				}
// 				relationship[id] = storage.get(relationshipModelType)[id];

// 			}
// 		};

angular.module('SharedComponents').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('shared/directive/form/button/hookFormButton.html',
    "<button class=\"btn btn-success\"\n" +
    "		type=\"submit\"\n" +
    "		ng-class=\"{ 'disabled': form.$invalid }\"\n" +
    "		ng-click=\"controller.store(controller[controller['type_singular']])\"\n" +
    "		ng-disabled=\"form.$invalid\"\n" +
    "		ng-if=\"controller.mode == 'create'\">{{ 'ui.create' | hookFilterMachineNameTranslate | hookFilterTitle }}</button>\n" +
    "\n" +
    "<button class=\"btn btn-success\"\n" +
    "		type=\"submit\"\n" +
    "		ng-class=\"{ 'disabled': form.$invalid }\"\n" +
    "		ng-click=\"controller.update(controller[controller['type_singular']])\"\n" +
    "		ng-disabled=\"form.$invalid\"\n" +
    "		ng-if=\"controller.mode == 'edit'\">{{ 'ui.save' | hookFilterMachineNameTranslate | hookFilterTitle }} </button>\n" +
    "\n" +
    "<!-- Cancel button -->\n" +
    "<button class=\"btn btn-warning\" \n" +
    "ng-click=\"\">{{ 'ui.cancel' | hookFilterMachineNameTranslate | hookFilterTitle }}</button>"
  );


  $templateCache.put('shared/directive/form/label/hookFormLabel.html',
    "<span ng-if=\"flag\" class=\"flag-icon flag-icon-{{ flag }}\"\n" +
    "	></span>\n" +
    "\n" +
    "<span ng-bind-html=\"('label.'+field) | hookFilterMachineNameTranslate | hookFilterTitle\"></span>\n" +
    "\n" +
    "<span ng-if=\"required=='true'\" class=\"text-red\">*</span>\n" +
    "\n" +
    "<span ng-if=\"form[field].$pending[field]\">\n" +
    "	\n" +
    "	<span class=\"spinner\">\n" +
    "	\n" +
    "		<i class=\"fa fa-spinner\"></i>\n" +
    "	\n" +
    "	</span> \n" +
    "	\n" +
    "	{{ 'ui.validating' | hookFilterMachineNameTranslate | hookFilterCapitalize }}...\n" +
    "\n" +
    "</span>"
  );


  $templateCache.put('shared/directive/form/validation_message/hookValidationMessage.html',
    "<p ng-repeat=\"(key, value) in form[field].$error\"\n" +
    "	ng-show=\"(form[field].$invalid && form[field].$dirty) || (form[field].$invalid && form[field].$touched)\">\n" +
    "	\n" +
    "	<span class=\"invalid-input\">\n" +
    "	\n" +
    "		<i class=\"fa fa-times-circle-o\"></i> \n" +
    "	\n" +
    "		{{  key | hookFilterMachineNameTranslate | hookFilterReplace:  ( form[field].$substitutions[key] | hookFilterMachineNameTranslate ) | hookFilterCapitalize }}\n" +
    "	\n" +
    "	</span>\n" +
    "\n" +
    "</p>\n"
  );


  $templateCache.put('shared/directive/special/action_button/box_tools/hookActionButtonBoxTools.html',
    "<!-- List button OK for type: resource-->\n" +
    "<a class=\"btn btn-sm btn-default\" \n" +
    "href=\"#/{{ controller['type_dash'] }}/list\" \n" +
    "ng-show=\"\n" +
    "controller.mode == 'show' ||\n" +
    "controller.mode == 'create' ||\n" +
    "controller.mode == 'edit'\n" +
    "\">{{ 'ui.list' | hookFilterMachineNameTranslate | hookFilterTitle }}</a>\n" +
    "\n" +
    "<!-- Show button -->\n" +
    "<a class=\"btn btn-sm btn-primary\" \n" +
    "href=\"#/{{ controller['type_dash'] }}/show/{{controller[controller['type_singular']].id}}\" \n" +
    "ng-show=\"\n" +
    "controller.mode == 'edit'\n" +
    "\">{{ 'ui.show' | hookFilterMachineNameTranslate | hookFilterTitle }}</a>\n" +
    "\n" +
    "<!-- Create button -->\n" +
    "<a class=\"btn btn-sm btn-success\" \n" +
    "href=\"#/{{ controller['type_dash'] }}/create\" \n" +
    "ng-show=\"\n" +
    "controller.mode == 'list'\n" +
    "\">{{ 'ui.create' | hookFilterMachineNameTranslate | hookFilterTitle }}</a>\n" +
    "\n" +
    "<!-- Edit button -->\n" +
    "<a class=\"btn btn-sm btn-warning\" \n" +
    "href=\"#/{{ controller['type_dash'] }}/edit/{{controller[controller['type_singular']].id}}\" \n" +
    "ng-show=\"\n" +
    "controller.mode == 'show'\n" +
    "\">{{ 'ui.edit' | hookFilterMachineNameTranslate | hookFilterTitle }}</a>\n" +
    "\n" +
    "<!-- Delete button -->\n" +
    "<button class=\"btn btn-sm btn-danger\"  \n" +
    "ng-click=\"controller.destroy(controller[controller['type_singular']])\" \n" +
    "ng-show=\"\n" +
    "controller.mode == 'show' ||\n" +
    "controller.mode == 'edit'\n" +
    "\">{{ 'ui.delete' | hookFilterMachineNameTranslate | hookFilterTitle }}</button>"
  );


  $templateCache.put('shared/directive/special/action_button/list/hookActionButtonList.html',
    "<!-- Show button -->\n" +
    "<a class=\"btn btn-xs btn-primary\" \n" +
    "href=\"#/{{ controller['type_dash'] }}/show/{{ resource.id }}\n" +
    "\">{{ 'ui.show' | hookFilterMachineNameTranslate | hookFilterTitle }}</a>\n" +
    "\n" +
    "<!-- Edit button -->\n" +
    "<a class=\"btn btn-xs btn-warning\" \n" +
    "href=\"#/{{ controller['type_dash'] }}/edit/{{ resource.id }}\n" +
    "\">{{ 'ui.edit' | hookFilterMachineNameTranslate | hookFilterTitle }}</a>\n" +
    "\n" +
    "<!-- Delete button -->\n" +
    "<button class=\"btn btn-xs btn-danger\" \n" +
    "ng-click=\"controller.destroy(resource)\n" +
    "\">{{ 'ui.delete' | hookFilterMachineNameTranslate | hookFilterTitle }}</button>"
  );


  $templateCache.put('shared/directive/special/translation_view/hookTranslationView.html',
    "<div class=\"box\">\n" +
    "	<div class=\"box-header with-border\">\n" +
    "\n" +
    "	<h3 class=\"box-title\">{{ 'ui.translation_view' | hookFilterMachineNameTranslate | hookFilterTitle }}</h3>\n" +
    "\n" +
    "</div><!-- /.box-header -->\n" +
    "\n" +
    "<div class=\"nav-tabs-custom\" ng-init=\"state.language=getLanguage()\">\n" +
    "\n" +
    "    <ul class=\"nav nav-tabs\">\n" +
    "     \n" +
    "      <li ng-class=\"{ 'active': state.language==language.iso_2_code }\"\n" +
    "      	ng-repeat=\"(id, language) in getEnabledLanguages()\">\n" +
    "      \n" +
    "      	<a href=\"\" ng-click=\"state.language=language.iso_2_code\">\n" +
    "      	\n" +
    "      		<span class=\"flag-icon flag-icon-{{ language.flag }}\"></span> \n" +
    "      	\n" +
    "      		{{ language.name | hookFilterContentTranslate }}\n" +
    "      	\n" +
    "      	</a>\n" +
    "     \n" +
    "      </li>\n" +
    "    \n" +
    "    </ul>\n" +
    "\n" +
    "	<div class=\"tab-content\">\n" +
    "	\n" +
    "		<dl><!-- class=\"dl-horizontal\" -->\n" +
    "			<dt ng-hide=\"(object | hookFilterCount) == 0\" ng-repeat-start=\"(key, object) in translationFieldsModel\">{{ 'label.' + key | hookFilterMachineNameTranslate | hookFilterTitle }}</dt>\n" +
    "			<dd ng-hide=\"(object | hookFilterCount) == 0\" ng-repeat-end>{{ object | hookFilterContentTranslate: state.language }}</dd>\n" +
    "		</dl>\n" +
    "\n" +
    "	</div><!-- /.tab-content -->\n" +
    "\n" +
    "    </div><!-- /.nav-tabs-custom -->\n" +
    "\n" +
    "</div><!-- /.box -->"
  );


  $templateCache.put('shared/section/heading_text.html',
    "<h1>{{ section.title | hookFilterContentTranslate: language() }}</h1>\n" +
    "<p>{{ section.body | hookFilterContentTranslate: language() }}</p>"
  );


  $templateCache.put('shared/section/heading.html',
    "<h1>{{ section.title | hookFilterContentTranslate: language() }}</h1>"
  );


  $templateCache.put('shared/section/subheading_text.html',
    "<h2>{{ section.title | hookFilterContentTranslate: language() }}</h2>\n" +
    "<p>{{ section.body | hookFilterContentTranslate: language() }}</p>"
  );


  $templateCache.put('shared/section/text.html',
    "<p>{{ section.body | hookFilterContentTranslate: language() }}</p>"
  );

}]);
