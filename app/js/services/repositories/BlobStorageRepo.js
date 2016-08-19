/**
 * Created by sswayney on 8/16/2016.
 */
(function () {
    angular.module('blobRepository', []).factory('BlobRepo', function(Restangular, config) {
        function BlobRepo() {
            this.GetDir = function (dir, getMetaData, filter){
                return Restangular.all(config.WebStore.Resources.BlobStorage.Path).get(dir, {metaData : getMetaData, typeFilterList : filter});
            };
        }

        return new BlobRepo();
    });
}());