/**
 * Created by sswayney on 8/9/2016.
 */
(function () {

    angular.module('tokenService', []).factory('TokenService', ['OAuthToken', 'OAuth', function (OAuthToken, OAuth) {
        return {
            Authorize: function (oauthModel) {
                return OAuth.getAccessToken(oauthModel);
            },
            /**
             * @return {boolean}
             */
            IsAuthenticated: function () {
                return OAuth.isAuthenticated();
            },
            /**
             * @return {string}
             */
            GetToken: function () {
                return this.IsAuthenticated() ? OAuthToken.getToken().token_type + ' ' + OAuthToken.getToken().access_token : "no token set";
            }
        };
    }]);

}());