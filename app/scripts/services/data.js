
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
                }
            },
            yAxis: {
                min: 0,
                title: {
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
                      fontFamily: 'Verdana, sans-serif',
                      //bottomPadding : '15px'
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
