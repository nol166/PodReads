angular.module("podreads")

  .component('create', {

    controller: function($http) {
      const vm = this
      let create;

      vm.$onInit = function() {
        $http.get('/create')
          .then(response => {
            vm.create = response.data
          })
      }
    },

    templateUrl: "../templates/create.html"
  })
