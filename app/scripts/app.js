(function(){

  angular.module('codeStats', ['codeStats.controllers', 'ui.bootstrap']);

  angular.module('codeStats.services', []);
  angular.module('codeStats.controllers', ['codeStats.services', 'highcharts-ng']);


})();
