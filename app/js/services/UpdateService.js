/**
 * Created by sswayney on 5/10/2016.
 */

var updateServices = angular.module('updateServices', ['splashServices']);

updateServices.factory('updateUtility', function() {
        var libraries = {},
            _exec_path = process.execPath,
            _exe_name = _exec_path.substr(_exec_path.lastIndexOf('\\') + 1);

        return {
            getVersion: function(){
                var fs = this.req('fs'),
                    manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

                return manifest.version;
            },
            getTmpPath: function(){

                return this.getRootPath + '/tmp/';
            },
            getRootPath: function(){

                return window.location.href.replace(/index.html.*/, '');
            },
            getRootDir: function(){

                return _exec_path.replace(new RegExp(_exe_name + '$'), '');
            },
            req: function(library){
                if(typeof libraries[library] != 'undefiend'){
                    libraries[library] = require(library);
                }

                return libraries[library];
            },
            closeApp: function(){

                console.log('closeApp called.');
                var gui = this.req('nw.gui'),
                    win = gui.Window.get();
                //this.req('nw-notify').closeAll();
                //console.log('this.req("nw-notify").closeAll();');
                gui.App.quit();
                console.log('gui.App.quit();');
            }
        }
    });

updateServices.factory('updateService', ['$location', 'updateUtility', 'splashService',

        function($location, updateUtility){
            var _fs = updateUtility.req('fs'),
                _gui = updateUtility.req('nw.gui'),
                _pkg = JSON.parse(_fs.readFileSync('package.json', 'utf8')),
                _updater = updateUtility.req('node-webkit-updater'),
                _upd = new _updater(_pkg),
                _manifest = _pkg,
                _filename;


            return {
                downloadStarted: false,
                updateRunning: false,
                checkNewVersion: function(beforeDownload, afterDownload, onError){
                    _upd.checkNewVersion(function(error, newVersionExists, manifest) {

                        if(error)
                        {
                            onError(error);
                            return;
                        }

                        if(beforeDownload){
                            beforeDownload(newVersionExists, manifest);
                        }
                        if (!error && newVersionExists) {
                            _manifest = manifest;

                            if(this.downloadStarted === false){
                                this.downloadStarted = true;
                                console.log('download start');
                                _upd.download(function(error, filename) {
                                    console.log('download end, error:');
                                    console.log(error);
                                    if (!error) {
                                        _filename = filename;
                                        console.log('done downloading to ' + filename);
                                        afterDownload();
                                    }
                                });
                            }
                        }
                    }.bind(this));
                },
                unpack: function(beforeUnpack, afterUnpack, onError){
                    if(_filename && this.updateRunning === false){
                        console.log('unpack');
                        beforeUnpack();
                        this.updateRunning = true;
                        _upd.unpack(_filename, function(error, newAppPath) {
                            console.log('unpack end, error:');
                            console.log(error);
                            if (!error) {
                                console.log('new app path: ' + newAppPath);
                                console.log('_upd.getAppPath() : ' + _upd.getAppPath());
                                console.log('_upd.getAppExec() : ' + _upd.getAppExec());
                                _upd.runInstaller(newAppPath, [_upd.getAppPath(), _upd.getAppExec()],{});
                                console.log('after runInstaller');
                                updateUtility.closeApp();
                                afterUnpack();
                            }else{
                                onError();
                            }
                        }, _manifest);
                    }else {
                        onError();
                    }

                },
                installUpdate: function(beforeInstall, afterInstall, onError){

                    beforeInstall();
                    this.updateRunning = true;
                    //$location.path('/update');
                    var copyPath = _gui.App.argv[0],
                        execPath = _gui.App.argv[1];

                    console.log('install run');
                    console.log('copy path: '+copyPath);
                    console.log('exec path: '+execPath);
                    _upd.install(copyPath, function(err) {
                        console.log('install end, error:');
                        console.log(err);
                        if(!err) {
                            afterInstall();
                            _upd.runInstaller(execPath, [],{});
                            updateUtility.closeApp();
                        }else{
                            onError();
                        }
                    });
                },
                getManifest: function(){

                    return _manifest;
                }
            }
        }]);

updateServices.run(['$rootScope','$timeout', 'updateUtility','updateService','splashService',
    function($rootScope,$timeout,updateUtility,updateService, splashService) {

        console.log('updateServices init');

        var fs = updateUtility.req('fs'),
            gui = updateUtility.req('nw.gui'),
            win = gui.Window.get(),
            checkNewVersion = function(before){
                updateService.checkNewVersion(function(){
                    $rootScope.$apply(function(){
                        $location.path('/start');
                    });
                }, before);
            };






        if(gui.App.argv.length) {
            console.log('gui.App.argv.length = ' + gui.App.argv.length);
            updateService.installUpdate(function(){
                //splashService.openWindow("Installing.");
                //splashService.setMessage("Installing..");
            },function(){
                //splashService.setMessage("Install Finished");
            },function(){
                splashService.openWindow("Error Installing Update");
                splashService.setMessage("Error Installing Update");
            });
            return;
        }
        else{
            //checkNewVersion();
            //setInterval(checkNewVersion, 1000*60*60*24);


            splashService.openWindow("loading...");

            var finishedStartup = function () {
                //gui.Window.get().show(true);
                console.log(updateService.getManifest());
                updateService.checkNewVersion(function(newVersionExists, manifest){
                        if(newVersionExists) {
                            splashService.setMessage("Update Found: Downloading Version " + manifest.version);
                        }
                        else {
                            splashService.closeWindow();
                            gui.Window.get().show(true);
                        }
                    },
                    function(){
                        splashService.setMessage("Downloaded");
                        //Unpack and install
                        updateService.unpack(function(){
                            splashService.setMessage("Unpacking");
                        },function(){
                            splashService.setMessage("Installing...");
                        },function(){
                            splashService.setMessage("Error Installing Update");
                        });
                    },
                    function(error){
                        splashService.setMessage("Error Downloading Update");
                    });
                //splashService.setMessage("All Done");
                //$location.url('/documents');

            };

            //how long to show splash loading
            $timeout(finishedStartup, 2000);

            //If after 10 seconds the main app isn't showing, show it.
            $timeout(function(){gui.Window.get().show(true);}, 10000);

        }

    }]);