(function(){
  angular.module('podreads', ['ui.router'])
    .config(config)

    config.$inject = ["$stateProvider", "$urlServiceProvider"]

    function config($stateProvider,$urlServiceProvider) {
      // make your app start at state 'podcasts'
      $urlServiceProvider.rules.otherwise({ state: 'podcasts' });
      $stateProvider
      .state('podcasts',{
        url: '/',
        component: 'podcasts',
        resolve: {
          loggedIn: function($http, $window, $state){
            let token = $window.localStorage.getItem('token');
              $http.post('/auth/verify', {token:token})
                .then( response => {
                  console.log('hello')
                  console.log('this should be the reponse',response);
                  if (response.data !== 'fail') {
                    console.log(response.data);
                    if (response.data.loginType === 'podcaster') {
                      console.log('we are on second if');
                      $window.localStorage.setItem('user',JSON.stringify(response.data))
                      return true
                    }
                  } else {
                    $state.go('create')
                  }
                })
                .catch( err => {
                  return err;
                })

            }
        },
      })
      .state('advertisers',{
        url: '/advertisers',
        resolve: {
          loggedIn: function($http, $window, $state){
            let token = $window.localStorage.getItem('token');
            $http.post('/auth/verify', {token:token})
            .then( response => {
              console.log("this should be the response", response);
              if (response.data !== 'fail') {
                if (response.data.loginType === 'advertiser') {
                  $window.localStorage.setItem('user',JSON.stringify(response.data))
                  return true
                }
              } else {
                $state.go('create')
              }
            })
            .catch( err => {
              return err;
            })
          }
        },
        component: 'advertisers'
      })
      .state('create',{
        url: '/create',
        component: 'create'
      })
      .state('podcastEdit',{
        url: '/podcastEdit',
        component: 'podcastEdit'
      })
      .state('advertiserEdit',{
        url: '/advertiserEdit',
        component: 'advertiserEdit'
      })
    }

})()

// Notes:
// Setup your states here using the $stateProvider object.
// Name, url, and component to render e.g.
// Example: $stateProvider
        // .state('state-name',{
        //   url: '/the-URL-that-should-show',
        //   component: 'componentName'
        // })
