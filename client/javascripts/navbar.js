angular.module("podreads")
       .component('navbar', {
         controller: function ($http, $window, $state) {
           const vm = this

            let user = JSON.parse($window.localStorage.getItem('user'));
            vm.loginType = user ?  user.loginType : false

            vm.signout = function(){
              vm.loginType = false;
              console.log(vm.loginType);
              $window.localStorage.removeItem('user')
              $window.localStorage.removeItem('token')
              $state.go('create');
            }

          },

          templateUrl: "../templates/navbar.html"
        })
