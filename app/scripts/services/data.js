
(function () {

   angular.module('codeStats.controllers')
   .service('dataService',function(){
    return {
      sharedData: {
        items: []
      }
    }
   });

   angular.module('codeStats.controllers')
   .service('chartService',function(){
    return {
            options: {
                chart: {
                    type: 'column'
                }
            },
            xAxis: {
                categories: ['Solo']
            },
            series: [{
                name: 'Item',
                data: [ {"name":"test","x": 0 ,"y":1}]
            }],
            title: {
                text: 'Code Comparison'
            },
            loading: false
          }
   });



})();
