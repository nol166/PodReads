angular.module("podreads")

  .component('podcastEdit', {

      controller: function($http, $stateParams, $state, $window) {
        const vm = this
        vm.editPodcast = editPodcast
        let currentUser = JSON.parse($window.localStorage.getItem('user'))
        console.log(currentUser);

        vm.$onInit = function() {
          console.log("edit podcast init working");
          // console.log(vm.podcast);
          $http.get(`/podcasts/${currentUser.id}`)
            .then(response => {
              vm.podcast = response.data
            })
        }

          function editPodcast() {
          console.log('editPodcast is called');
          console.log('this is vm podcast', vm.podcast);
          $http.patch(`/podcasts/${currentUser.id}`, {
            podcast: vm.podcast,
            token: $window.localStorage.getItem('token')
          })
            .then(response => {
              $state.go('podcasts')
            })
        }
    },


    templateUrl: "../templates/podcastEdit.html"

// template: "../templates/advertisers.html"
})
