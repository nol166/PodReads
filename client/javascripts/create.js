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
        console.log(vm.advertiser);
        vm.advertiser.loginType = 'advertiser'

        $http.post('/advertisers', vm.advertiser)
          .then(response => {
            console.log("clicked advertiser submit")
            // response.data.comments = []
            console.log(response);
            $window.localStorage.setItem('token', response.data.token)
            $state.go('advertisers')
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
        vm.podcast.loginType = 'podcaster'
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
      console.log("HELLO >>>", vm.user);
      // replace test@test.com stuff with form data to log in
      $http.post('/auth/login', {email: vm.user.email, password: vm.user.password, loginType: vm.user.loginType})
        .then(function(response){
          console.log(vm.user.email);
          console.log('USER DATA FROM BACKEND',response);
          $window.localStorage.setItem('token', response.data.token)
          if (vm.user.loginType === 'podcaster') {
            $state.go('podcasts')
          } else if (vm.user.loginType === 'advertiser'){
            $state.go('advertisers')
          }
        }, function(err) {
          console.log(err);
          alert('incorrect login credentials')
        })
    }

  },

    templateUrl: "../templates/create.html"

  })
