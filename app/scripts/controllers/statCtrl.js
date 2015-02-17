(function () {
  'use strict';

  angular.module('codeStats.controllers')
    .controller('StatController',function(dataService, $scope){
      $scope.items = dataService.sharedData.items;

    });

    angular.module('codeStats.controllers')
    .controller('GroupController',function(dataService, $scope){
      

      this.remakeGroups = function(){
        var groups = [];
        
        for(var i=0 ; i < dataService.sharedData.items.length ;i++ ){
          
          if (groups.indexOf(dataService.sharedData.items[i].group) == -1){
            groups.push(dataService.sharedData.items[i].group);
          }
        }
        $scope.groups = groups;
      }
      
     

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

      this.addSnippet = function(callback){
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
            body: data.output.stats,
            statements: data.output.statements,
            code: my_code
          }
          chartService.xAxis.categories = remakeCategories(chartService.xAxis.categories, newItem.body)
          
          //add groupings
          if (chartService.series.length > 0){
            var max=0.0;
            var bestGroup = 0;
            for (var i=0; i < dataService.sharedData.items.length; i++){
              if (dataService.sharedData.items[i].group > bestGroup){
                bestGroup = dataService.sharedData.items[i].group + 1
              }
            }
            for (var i=0; i <  dataService.sharedData.items.length; i++){
              var fields = chartService.xAxis.categories;
              var arry1 = genArray(fields, dataService.sharedData.items[i].body);
              var arry2 = genArray(fields, newItem.body);
              arry1 = arry1.concat(dataService.sharedData.items[i].statements);
              arry2 = arry2.concat(newItem.statements);
              fields = fields.concat("Statements");
              var compareResult = cosineCompare(arry1, arry2, fields);
              console.log("CompareResult", compareResult)
              if (compareResult > max && compareResult > 0.95){
                max = compareResult;
                bestGroup = dataService.sharedData.items[i].group;
              }
              console.log("Max", max);
              
            }
            console.log("Group",bestGroup)
            newItem.group = bestGroup;
          }
          else{
            //default first group
            newItem.group = 1;
          }

          dataService.sharedData.items.push(newItem);

          chartService.series = [];
          for (var i=0; i < dataService.sharedData.items.length; i++){
            chartService.series.push({
              name: dataService.sharedData.items[i].name,
              data: genArray(chartService.xAxis.categories, dataService.sharedData.items[i].body),
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
          }
          
          callback()
        });
        this.snippet = {};

      }
    });

  angular.module('codeStats.controllers')
    .controller('ChartController', function($scope, chartService){

        $scope.chartConfig = chartService;

    });

  //for use when pushing items into chart
  function genArray(fields, item){
    var array = [];
    for (var i = 0; i<fields.length; i++){
      array.push(item[fields[i]] || 0);
    }
    return array;
  }

  function remakeCategories(prev, next){
    var fields = [];
  
    fields = fields.concat(prev);
    for (var prop in next){
      if (fields.indexOf(prop) == -1){
        fields.push(prop);
      }
    }
    return fields;
  }

  function cosineCompare(arr1, arr2, fields){
    var array1 = [].concat(arr1);
    var array2 = [].concat(arr2)
    var sim =0.0;
    var num = arr1.length;
    var dot = 0.0;
    var mag1 = 0.0;
    var mag2 = 0.0;
    for (var n=0 ;n < num; n++){
      //add weightings
      
      if (fields[n] == "Regex" || fields[n] == "Functions" || fields[n] == "DeepestNested"){
        array1[n] = array1[n] * 3; 
        array2[n] = array2[n] * 3;
      }


      dot += array1[n] * array2[n];
      mag1 += Math.pow(array1[n], 2);
      mag2 += Math.pow(array2[n], 2);
    }
    return dot / (Math.sqrt(mag1) * Math.sqrt(mag2));
  
  }
    

}());
