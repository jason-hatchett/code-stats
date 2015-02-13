
(function () {

   angular.module('codeStats.controllers')
   .service('dataService',function(){
    return {
      sharedData: {
        items: []
       /*items: [
          {
            name: 'first',
            body:{
              count: 20,
              tracked: 'yes'
            },
            screenShown: true
          },
          {
            name: 'second',
            body:{
              count: 5,
              tracked: 'no'
            },
            screenShown: false
          },
          {
            name: 'third',
            body:{
              count: 15,
              tracked: 'no'
            },
            screenShown: true
          }
        ] */
      }
    }
   });
})();
