
//Create Module
var docApp = angular.module('docApp', ['alertServices','ngTouch','ngAnimate','ngRoute','ngMessages','ui.bootstrap.alert','docApp.Config',
                                        'tokenService','angular-oauth2','restangular', 'cdnRepository', 'blobRepository', 'webStorageService']);


//Define routes
docApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/start.html',
            controller: 'StartController'
        })
        .when('/start',{
            templateUrl: 'views/start.html',
            controller: 'StartController'
        })
        .when('/documents',{
            templateUrl: 'views/mydocs.html',
            controller: 'MyDocsController'
        })
        .when('/settings',{
            templateUrl: 'views/settings.html',
            controller: 'SettingsController'
        })
        .when('/search',{
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        })
        .when('/login',{
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .otherwise({redirectTo: '/login'});

    //$locationProvider.html5Mode(true);

});

//OAuth2
docApp.config(['OAuthProvider', function(OAuthProvider) {
    OAuthProvider.configure({
        baseUrl: 'http://localhost:2222',
        clientId: 'DUMMY_CLIENT_ID',
        grantPath: 'oauth2/token'
    });
}]);

docApp.config(['OAuthTokenProvider', function(OAuthTokenProvider) {

    var minutes = 60;
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + (minutes * 60 * 1000));

    OAuthTokenProvider.configure({
        name: 'tkn-reg-ws',
        options: {
            secure: false,
            expires: expireDate
        }
    });
}]);

//We can handle oauth here if we want
docApp.run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
        // $rootScope.$on('oauth:error', function(event, rejection) {
        //     // Ignore `invalid_grant` error - should be catched on `LoginController`.
        //     if ('invalid_grant' === rejection.data.error) {
        //         return;
        //     }
        //
        //     // Refresh token when a `invalid_token` error occurs.
        //     if ('invalid_token' === rejection.data.error) {
        //         return OAuth.getRefreshToken();
        //     }
        //
        //     // Redirect to `/login` with the `error_reason`.
        //     return $window.location.href = '/login?error_reason=' + rejection.data.error;
        // });
    }]);

//Restangular
docApp.run(function(Restangular,config) {
    Restangular.setBaseUrl(config.WebStore.URL);
});
