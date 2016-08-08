/**
 * Created by sswayney on 5/4/2016.
 */
'use strict';

docApp.controller('SettingsController', function SettingsController($scope, $http, alertService) {

    var os = require("os");
    var fs = require("fs");
    var shell = require('electron').shell;

    $scope.workingDir = os.homedir() + '\\Microsemi Document Explorer';
    $scope.testFile = 'MDX.txt';
    $scope.listData = [];

    var getFileURI = function () {
        return $scope.workingDir + '/' + $scope.testFile;
    };

    $scope.showDevTools = function () {
        // gui.Window.get().showDevTools();
    };


    $scope.testCreateFolder = function () {
        console.log("Going to create directory " + $scope.workingDir);

        fs.mkdir($scope.workingDir,function(err){
            if (err) {
                alertService.add('danger',err.message);
                return console.error(err);
            }
            console.log("Directory created successfully! : " + $scope.workingDir);
            alertService.add('success',"Directory created successfully! : " + $scope.workingDir);
        });
    };

    $scope.testReadFolder = function () {
        console.log("Going to read directory " + $scope.workingDir);
        fs.readdir($scope.workingDir,function(err, files){
            if (err) {
                alertService.add('danger',err.message);
                return console.error(err);
            }

            console.log("Start of files in "  + $scope.workingDir);
            files.forEach( function (file){
                console.log( file );
            });
            console.log("End of files in "  + $scope.workingDir);
            alertService.add('success',"Directory Read Success! : See Console for details");


        });
    };

    $scope.testCanReadFolder = function () {
        fs.access($scope.workingDir, fs.R_OK , function (err) {
            console.log(err);
            alertService.add('success',err ? 'can not read ' + $scope.workingDir : 'can read '  + $scope.workingDir);
            console.log(err ? 'can not read ' + $scope.workingDir : 'can read '  + $scope.workingDir);
        });
    };

    $scope.testCanWriteFolder = function () {
        fs.access($scope.workingDir, fs.W_OK , function (err) {
            console.log(err);
            alertService.add('success',err ? 'can not write to ' + $scope.workingDir : 'can write to '  + $scope.workingDir);
            console.log(err ? 'can not write to ' + $scope.workingDir : 'can write to '  + $scope.workingDir);
        });
    };

    $scope.testDeleteFolder = function () {
        console.log("Going to delete directory "  + $scope.workingDir);
        fs.rmdir($scope.workingDir,function(err){
            if (err) {
                alertService.add('danger',err.message);
                return console.error(err);
            }
            alertService.add('success',"Deleted successfully! : " + $scope.workingDir);
            console.log("Deleted dir: " + $scope.workingDir);
        });
    };



    $scope.testWriteFile = function () {

        console.log("Going to write into existing file");

        fs.writeFile(getFileURI(), 'Microsemi Document Explorer : File Write Test',  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("Data written successfully!");
            console.log("Let's read newly written data");
            fs.readFile(getFileURI(), function (err, data) {
                if (err) {
                    alertService.add('danger',err.message);
                    return console.error(err);
                }
                alertService.add('success',"File created and written to " + getFileURI());
                console.log("Asynchronous read: " + data.toString());
            });
        });

    };

    $scope.testReadFile = function () {
        // Asynchronous read
        fs.readFile(getFileURI(), function (err, data) {
            if (err) {
                alertService.add('danger',"Create the file first " + err.message);
                return console.error(err);
            }
            alertService.add('success',"Asynchronous read: " + data.toString());
            console.log("Asynchronous read: " + data.toString());
        });
    };
    
    $scope.testOpenFile = function () {


        shell.openExternal(getFileURI());
        // Asynchronous - Opening File
        // console.log("Going to open file!");
        // fs.open(testFile, 'rs+', function(err, fd) {
        //     if (err) {
        //         alertService.add('danger',err.message);
        //         return console.error(err);
        //     }
        //     alertService.add('success',"File opened successfully!");
        //     console.log("File opened successfully!");
        // });
    };

    $scope.testFileStatus = function () {
        // Asynchronous - Opening File
        console.log("Going to get file info!");
        fs.stat('input.txt', function (err, stats) {
            if (err) {
                alertService.add('danger',err.message);
                return console.error(err);
            }
            console.log(stats);
            console.log("Got file info successfully!");

            // Check file type
            console.log("isFile ? " + stats.isFile());
            console.log("isDirectory ? " + stats.isDirectory());
        });
    };

    
    $scope.testDeleteFile = function () {
        console.log("Going to delete an existing file");
        fs.unlink(getFileURI(), function(err) {
            if (err) {
                alertService.add('danger',err.message);
                return console.error(err);
            }
            alertService.add('success',"File deleted successfully!");
            console.log("File deleted successfully!");
        });
    };
    

    $scope.testApi = function () {
        $http.get("https://api.microsemi.com/Location/countries").then(function(response) {
            $scope.listData = response.data.data;
        });
    }



});