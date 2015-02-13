(function () {
  'use strict';

  angular.module('codeStats.controllers')
    .controller('StatController',function(dataService, $scope){
      $scope.items = dataService.sharedData.items;
    });

  angular.module('codeStats.controllers')
    .controller('TextController',function(dataService, chartService, $http){
      this.snippet = {};

      this.addSnippet = function(){
        //actually want to push ajax result of post request

        var my_name = this.snippet.name;

        $http({
            method: 'POST',
            url: '/analyze',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {stuff: this.snippet.body}
        }).success(function (data) {
          var body = data//JSON.parse(data)
          var newItem = {
            name: my_name,
            body: body.output,
            screenShown: true
          }
          dataService.sharedData.items.push(newItem);
          chartService.xAxis.categories = Object.keys(dataService.sharedData.items[0].body)
          chartService.series[0].name = dataService.sharedData.items[0].name
          chartService.series[0].data = objValues(dataService.sharedData.items[0].body)

        });
        this.snippet = {};

      }
    });

  angular.module('codeStats.controllers')
    .controller('ChartController', function($scope, dataService, chartService){

        $scope.chartConfig = chartService;

    });


  function objValues (obj) {
    var results = []
    for (var prop in obj) {
      results.push(obj[prop])
    }
    return results;
  }
    

}());
