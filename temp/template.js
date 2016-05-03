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
