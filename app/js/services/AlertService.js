/**
 * Created by sswayney on 5/5/2016.
 */
angular.module('alertServices', []).factory('alertService', function($rootScope) {

    // the alert service object
    var alertService = {};

    // create an array of alerts available globally
    $rootScope.alerts = [];

    //Adds to the alert array in root scope
    //alert types: default primary success warning danger info
    alertService.add = function(type, msg) {

        $rootScope.$apply(function () {
            $rootScope.alerts.push({'type': type, 'msg': msg, close: function () { alertService.closeAlert(this)} });
        });
    };

    //removes an alert from root scope
    alertService.closeAlert = function (alert) {
      var alertIndex =  $rootScope.alerts.indexOf(alert);
        $rootScope.alerts.splice(alertIndex,1);
    };

    return alertService;
});