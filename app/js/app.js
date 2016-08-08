
//Create Module
var docApp = angular.module('docApp', ['alertServices','ngTouch','ngAnimate','ngRoute','ngMessages','ui.bootstrap.alert']);

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