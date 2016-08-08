/**
 * Created by sswayney on 5/12/2016.
 */
var splashServices = angular.module('splashServices', []);

splashServices.factory('splashService', function() {

    var splashWindow = null;

    return {
        openWindow: function(message){

            if(splashWindow != null){
                splashWindow.close();
            }

            var gui = require("nw.gui");
            gui.Window.open('app/views/splash.html', {
                position: 'center',
                width: 400,
                height: 300,
                frame: false
            }, function (win){
                splashWindow = win;
                splashWindow.message = message;

            });

        },
        closeWindow: function(){
            if(splashWindow != null){
                splashWindow.close();
            }
        },
        setMessage: function (message){
            if(splashWindow != null){
                splashWindow.window.document.getElementById("splashStatus").innerText = message;
            }
        }
    }
});
