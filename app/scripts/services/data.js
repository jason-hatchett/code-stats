
(function () {

   angular.module('codeStats.controllers')
   .service('dataService',function(){
    return {
      sharedData: {
       items: [
          {
            name: 'first',
            count: 20,
            tracked: 'yes',
            screenShown: true
          },
          {
            name: 'second',
            count: 5,
            tracked: 'no',
            screenShown: false
          },
          {
            name: 'third',
            count: 15,
            tracked: 'no',
            screenShown: true
          }
        ] 
      }
    }
   });
})();
