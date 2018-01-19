angular.module("podreads")

       .component('advertisers', {

         controller: function ($http, $window) {
           const vm = this
           let advertisers;



           vm.$onInit = function() {
             console.log($window.localStorage.getItem('user'));
             let user = JSON.parse($window.localStorage.getItem('user'));
             // console.log(user.name, "is logged in");

             $http.get('/advertisers')
               .then(response => {
                 // console.log(response.data);
                 for (var i = 0; i < response.data.length; i++) {
                   let advertiser = response.data[i];
                   advertiser.tagList = advertiser.tags.split(", ")
                 }
                 // response.data.tags
                 vm.advertisers = response.data
                 console.log(advertisers[0].tagList)

            })
           }
         },

         templateUrl: "../templates/advertisers.html"
         // template: "../templates/podcasts.html"
       })
