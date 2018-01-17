angular.module("podreads")

       .component('podcasts', {

         controller: function ($http, $window) {
           const vm = this
           let podcasts;



           vm.$onInit = function() {
             let user = JSON.parse($window.localStorage.getItem('user'));
             console.log(user.name, "is logged in");

             $http.get('/podcasts')
               .then(response => {
                 // console.log(response.data);
                 for (var i = 0; i < response.data.length; i++) {
                   let podcast = response.data[i];
                   podcast.tagList = podcast.tags.split(", ")
                 }
                 // response.data.tags
                 vm.podcasts = response.data
                 console.log(podcasts[0].tagList)

            })
           }
         },

         templateUrl: "../templates/podcasts.html"
         // template: "../templates/podcasts.html"
       })
