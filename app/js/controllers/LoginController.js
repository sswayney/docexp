/**
 * Created by sswayney on 5/4/2016.
 */
'use strict';

docApp.controller('LoginController', function LoginController($scope, TokenService) {

    $scope.userLogin = {"Username":"","Password":"","Scopes":"WebStoreAdmin"};

    $scope.logIn = function () {
        TokenService.Authorize($scope.userLogin).then(function(){
        })
    }

});