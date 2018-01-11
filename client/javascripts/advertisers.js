angular.module("podreads")

  .component('advertisers', {

    controller: function($http) {
      const vm = this
      let advertisers;

      vm.$onInit = function() {
        $http.get('/advertisers')
          .then(response => {
            vm.advertisers = response.data
          })
      }
    },

    templateUrl: "../templates/advertisers.html"
    // template: "../templates/advertisers.html"
  })
