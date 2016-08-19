/**
 * Created by sswayney on 8/16/2016.
 */
(function () {
    angular.module('cdnRepository', []).factory('CDNRepo', function(Restangular, config) {
        function CDNRepo() {
            this.GetFileUrl = function (path){
                return Restangular.all(config.WebStore.Resources.CDNStorage.Path).get(path);
            };
        }

        return new CDNRepo();
        });
}());