angular.module("podreads")

  .component('create', {

    controller: function($http, $window, $state) {
      const vm = this
      let create;

      vm.$onInit = function() {
        $http.get('/create')
          .then(response => {
            vm.create = response.data
          })
          .catch(function(error) {
          // , function(err) {
          //   console.log(err);
          // })
      })
    }

    // sign up for advertiser
      vm.addAdvertiser = () => {
        $http.post('/advertisers', vm.advertiser)
          .then(response => {
            console.log("clicked advertiser submit")
            // response.data.comments = []
            vm.advertiser.push(response.data)
            delete vm.advertiser
          })
          .catch(function(error) {
          // , function(err) {
          //   console.log(err);
          // })
      })
     }

    // sign up for podcaster
      vm.addPodcast = () => {
        console.log(vm.podcast);
        $http.post('/podcasts', vm.podcast)
          .then(response => {
            console.log("clicked podcast submit")
            // response.data.comments = []
            console.log(response);
            $window.localStorage.setItem('token', response.data.token)
            $state.go('podcasts')
          })
          .catch(function(error) {
          // , function(err) {
          //   console.log(err);
          // })
          })
    }

    // SIGN IN FOR PODCAST AND ADVERTISERS
    vm.signIn = () => {
      // replace test@test.com stuff with form data to log in
      $http.post('/auth/login', {email: 'test@test.com', password: 'test', loginType: 'podcaster'})
        .then(function(response){
          console.log('USER DATA FROM BACKEND',response);
          $window.localStorage.setItem('token', response.data.token)
          if (vm.loginType === 'podcaster') {
            $state.go('podcasts')
          } else {
            $state.go('advertiser')
          }
        }, function(err) {
          console.log(err);
        })
    }

  },

    templateUrl: "../templates/create.html"

  })
