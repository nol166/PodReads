angular.module("podreads")

       .component('podcasts', {

         controller: function ($http) {
           const vm = this
           let podcasts;

           vm.$onInit = function() {
             $http.get('/podcasts')
               .then(response => {
                 vm.podcasts = response.data
            })
           }
         },

         templateUrl: "../templates/podcasts.html"
         // template: "../templates/podcasts.html"
       })
