(function () {
  'use strict';

  angular.module('codeStats.controllers')
    .controller('StatController',function(dataService, $scope){
      $scope.items = dataService.sharedData.items;
    });

  angular.module('codeStats.controllers')
    .controller('TextController',function(dataService, $http){
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
          
        });

        this.snippet = {};

      }
    });

}());
