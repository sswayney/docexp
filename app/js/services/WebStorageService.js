/**
 * Created by sswayney on 8/16/2016.
 */
(function () {

    angular.module('webStorageService', []).factory('WebStorageService', ['BlobRepo', 'CDNRepo', function (BlobRepo, CDNRepo) {
        return {
            GetDirectory: function (dir, getMetaData, filter) {
                return BlobRepo.GetDir(dir, getMetaData, filter)
            },
            GetFileUrl : function (path) {
                return CDNRepo.GetFileUrl(path);
            }
        };
    }]);

}());