(function () {
  'use strict';

  angular.module('codeStats.controllers')
    .controller('StatController',function(dataService, $scope){
      $scope.items = dataService.sharedData.items;
    });

  angular.module('codeStats.controllers')
    .controller('TabController',function(){
      this.tab = 0;

      this.setTab = function(newValue){
          this.tab = newValue;
        };

      this.isSet = function(tabName){
        return this.tab === tabName;
      };
    });

  angular.module('codeStats.controllers')
    .controller('TextController',function(dataService, chartService, $http){
      this.snippet = {};

      this.addSnippet = function(){
        //actually want to push ajax result of post request

        var my_name = this.snippet.name;
        var my_code = this.snippet.body

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
          
          var newItem = {
            name: my_name,
            body: data.output,
            code: my_code,
            screenShown: true
          }
          dataService.sharedData.items.push(newItem);
          var last_idx = dataService.sharedData.items.length -1
          chartService.xAxis.categories = Object.keys(dataService.sharedData.items[0].body)
          chartService.series.push({
            name: newItem.name,
            data: objValues(newItem.body),
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black',
                }
            }
          })
          //chartService.series[last_idx].name = dataService.sharedData.items[last_idx].name
          //chartService.series[last_idx].data = objValues(dataService.sharedData.items[last_idx].body)

        });
        this.snippet = {};

      }
    });

  angular.module('codeStats.controllers')
    .controller('ChartController', function($scope, chartService){

        $scope.chartConfig = chartService;

    });

  //for use when pushing items into chart
  function objValues (obj) {
    var results = []
    for (var prop in obj) {
      results.push(obj[prop])
    }
    return results;
  }
    

}());
