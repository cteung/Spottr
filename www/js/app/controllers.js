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
        '$state', '$scope', 'UserService', '$ionicModal', '$compile',   // <-- controller dependencies
        function ($state, $scope, UserService, $ionicModal, $compile) {


            var posts = angular.element( document.querySelector('#posts') );

            refresh();
        
            function refresh(){

                post = Parse.Object.extend("Post");
                var query = new Parse.Query(post);

                query.find({
                    success:function(results) {
                        posts.empty();
                        console.dir(results);
                        for(var i=0, len=results.length; i<len; i++) {
                            var s = "";
                            var post = results[i];
                            s += "<div ng-click=openModal1(sswVJGhB0M)>";
                            s += "<p>";
                            s += "<b>"+post.id+"</b><br/>";
                            s += "<b>"+post.get("Time")+"</b><br/>";
                            s += "<b>"+post.get("Description")+"</b><br/>";
                            s += "<b>Written "+post.createdAt + "<br/>";
                            s += "</p>";
                            s += "</div>";
                            posts.append($compile(s)($scope));
                        }

                    },
                    error:function(error) {
                        alert("Error when getting posts!");
                    }
                });

            };
            
            $scope.doRefreshAction = function() {
                refresh();
            };

            $scope.contact = {
                name: 'Mittens Cat',
                info: 'Tap anywhere on the card to open the modal'
              }

              $ionicModal.fromTemplateUrl('contact-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
              }).then(function(modal) {
                $scope.modal = modal
              })  

              $scope.openModal = function() {
                $scope.modal.show()
              }

              $scope.openModal1 = function(postid) {
                alert(postid);
                $scope.modal.show()
              }

              $scope.closeModal = function() {
                $scope.modal.hide();
              };

              $scope.$on('$destroy', function() {
                $scope.modal.remove();
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
