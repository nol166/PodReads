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
        component: 'podcasts'
      })
      .state('advertisers',{
        url: '/advertisers',
        component: 'advertisers'
      })
      .state('create',{
        url: '/create',
        component: 'create'
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
