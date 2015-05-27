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

                var postArray = [];

                post = Parse.Object.extend("Post");
                var query = new Parse.Query(post);

                query.find({
                    success:function(results) {
                        posts.empty();
                        console.dir(results);
                        for(var i=0, len=results.length; i<len; i++) {
                            var post = results[i];
                            var id = post.id;
                            var name = post.get('Name');
                            var time = post.get('Time');
                            var desc = post.get('Description');

                            var json = {
                                "id": id,
                                "name": name,
                                "time": time,
                                "desc": desc
                            };

                            postArray.push(json);

                        }

                        $scope.postList = postArray;

                    },
                    error:function(error) {
                        alert("Error when getting posts!");
                    }
                });

            };
            
            $scope.doRefreshAction = function() {
                refresh();
            };

            $scope.detailAction = function() {
                refresh();
            };

            $scope.contact = {
                name: 'id',
                info: 'Tap anywhere on the card to open the modal'
            }

            $ionicModal.fromTemplateUrl('contact-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
                }).then(function(modal) {
                $scope.modal = modal
            });  

            $scope.openModal = function() {
            $scope.modal.show()
            };

            $scope.openModal1 = function(user) {      

                $scope.contact.name = user.name;
                $scope.contact.info = user.desc;

                $scope.modal.show()
            };

            $scope.closeModal = function() {
                $scope.modal.hide();
            };

            $scope.respondModal = function() {
                $scope.modal.hide();
                $state.go('tab.notification');
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
