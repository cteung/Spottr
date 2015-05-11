/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.dataList = ["One", "Two", "Three"];
            
            $scope.doLogoutAction = function() {
                Parse.User.logOut();
                $state.go('app-login', {
                    clear: true
                });
            };
        }])
    .controller('CreateCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.post = {};

            $scope.doCreateAction = function() {


                UserService.init();

                UserService.createPost($scope.post);
            };
        }])
    .controller('HomeCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            post = Parse.Object.extend("Post");
            var query = new Parse.Query(post);
            query.find({
                success:function(results) {
                    console.dir(results);
                    var s = "";
                    for(var i=0, len=results.length; i<len; i++) {
                        var post = results[i];
                        s += "<p>";
                        s += "<b>"+post.get("Time")+"</b><br/>";
                        s += "<b>"+post.get("Description")+"</b><br/>";
                        s += "<b>Written "+post.createdAt + "<br/>";
                        s += "</p>";
                    }
                    $scope.home = post.get("Time");
                    //angular.element("#posts").html(s);
                },
                error:function(error) {
                    alert("Error when getting posts!");
                }
            });

        }])
    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }]);
