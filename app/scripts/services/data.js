
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
                    type: 'column',
                    marginLeft: 55,
                    marginBottom: 140
                }
            },
            yAxis: {
                min: 0,
                title: {
                    x: -25,
                    text: 'Values',
                    style: {
                      fontSize: '15px',
                      fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            xAxis: {
                labels: {
                  
                  rotation: -45,
                  style: {
                      fontSize: '15px',
                      fontFamily: 'Verdana, sans-serif'
                  }
                },
                categories: []
            },
            series: [],
            title: {
                text: 'Code Comparison'
            },
            loading: false
          }
   });



})();
