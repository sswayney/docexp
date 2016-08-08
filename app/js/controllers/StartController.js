/**
 * Created by sswayney on 5/6/2016.
 */
'use strict';

docApp.controller('StartController', function StartController($scope,$location, $timeout) {

    //this should be moved into init for update services

    // $scope.manifest = updateService.getManifest();//object
    // $scope.updateRunning = updateService.updateRunning;//property
    // $scope.unpack = updateService.unpack;//function
    // $scope.checkNewVer = function(){updateService.checkNewVersion(function(){},null);};
    // $scope.install = function(){updateService.installUpdate();};
    //
    // var gui = require("nw.gui");
    //splashService.openWindow("loading...");
    //
    //
    //
    //
    //var finishedStartup = function () {
    //    //gui.Window.get().show(true);
    //    console.log(updateService.getManifest());
    //    updateService.checkNewVersion(function(newVersionExists, manifest){
    //        if(newVersionExists) {
    //            splashService.setMessage("Update Found: Downloading Version " + manifest.version);
    //        }
    //        else {
    //            splashService.closeWindow();
    //            gui.Window.get().show(true);
    //        }
    //    },
    //    function(){
    //        splashService.setMessage("Downloaded");
    //        //Unpack and install
    //        updateService.unpack(function(){
    //            splashService.setMessage("Unpacking");
    //        },function(){
    //            splashService.setMessage("Installing...");
    //        },function(){
    //            splashService.setMessage("Error Installing Update");
    //        });
    //    },
    //    function(error){
    //        splashService.setMessage("Error Downloading Update");
    //    });
    //    //splashService.setMessage("All Done");
    //    //$location.url('/documents');
    //
    //};
    //
    //var start = function () {
    //    $timeout(finishedStartup, 2000);
    //};
    //
    //start();









    // $scope.close = function () {
    //     window.close();
    // };
    //
    // $scope.minimize = function () {
    //     gui.Window.get().minimize();
    // };
    //
    // $scope.restore = function () {
    //     gui.Window.get().restore();
    // };

});