angular.module("podreads")

  .component('podcastEdit', {

      controller: function($http, $stateParams, $state, $window) {
        const vm = this
        vm.editPodcast = editPodcast
        let podcast;
        let currentUser = JSON.parse($window.localStorage.getItem('user'))
        console.log(currentUser);

        vm.$onInit = function() {
          $http.get(`/podcasts/${currentUser.id}`)
            .then(response => {
              vm.podcast = response.data
            })
        }

        function editPodcast() {
          $http.patch(`/podcasts/${currentUser.id}`, {
            podcast: {
              id: podcast.id,
              email: podcast.email,
              summary: podcast.summary,
              tags: podcast.tags,
              name: podcast.name,
              genre: podcast.genre,
              itunes_url: podcast.itunes_url,
              website: podcast.website,
              reader: podcast.reader,
              profile_image: podcast.profile_image,
              contact: podcast.contact,
              subject: podcast.subject,
              demo: podcast.demo,
              loginType: decoded.type,
              images: podcast.images
            },
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
