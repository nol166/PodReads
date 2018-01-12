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

      vm.addAdvertiser = () => {
        $http.post('/advertisers', vm.advertiser)
          .then(response => {
            console.log("clicked advertiser submit")
            // response.data.comments = []
            vm.advertiser.push(response.data)
            delete vm.advertiser
          })
      }

      vm.addPodcast = () => {
        $http.post('/podcasts', vm.podcast)
          .then(response => {
            console.log("clicked podcast submit")
            // response.data.comments = []
            vm.podcast.push(response.data)
            delete vm.podcast
          })
      }

    },



    templateUrl: "../templates/create.html"
  })
