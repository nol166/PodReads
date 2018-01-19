angular.module("podreads")

  .component('advertiserEdit', {

      controller: function($http, $stateParams, $state, $window) {
        const vm = this
        vm.editAdvertiser = editAdvertiser
        let advertiser = vm.advertiser
        let currentUser = JSON.parse($window.localStorage.getItem('user'))
        console.log(currentUser);

        vm.$onInit = function() {
          console.log("edit advertiser init working");
          // console.log(vm.advertiser);
          $http.get(`/advertisers/${currentUser.id}`)
            .then(response => {
              vm.advertiser = response.data
            })
        }

          function editAdvertiser() {
          console.log('editAdvertiser is called');
          $http.patch(`/advertisers/${currentUser.id}`, {
            advertiser: advertiser,
            token: $window.localStorage.getItem('token')
          })
            .then(response => {
              console.log(data)
              $state.go('advertisers')
            })
        }
    },


    templateUrl: "../templates/advertiserEdit.html"

// template: "../templates/advertisers.html"
})
