/**
 * Created by sswayney on 5/4/2016.
 */
'use strict';

docApp.controller('NavbarController', function NavbarController($scope, $location) {

    $scope.routeIs = function(routeName) {
        return $location.path() === routeName;
    };

    $scope.close = function () {
        window.close();
    }

});