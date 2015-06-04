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
    .controller('NotificationCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            var notes = angular.element( document.querySelector('#notes') );

            refresh();
        
            function refresh(){

                var noteArray = [];

                note = Parse.Object.extend("Note");
                var query = new Parse.Query(post);

                query.find({
                    success:function(results) {
                        notes.empty();
                        console.dir(results);
                        for(var i=0, len=results.length; i<len; i++) {
                            var note = results[i];
                            var createId = note.get('Message');
                            var name = note.get('Name');
                            var desc = note.get('Description');

                            var time = new Date();
                            time = note.get('Time');
                            var hour = time.getHours();
                            var min = time.getMinutes();

                            var json = {
                                "createId": createId,
                                "name": name,
                                "hour": hour,
                                "min": min,
                                "desc": desc
                            };

                            postArray.push(json);

                        }

                        $scope.noteList = postArray;

                    },
                    error:function(error) {
                        alert("Error when getting posts!");
                    }
                });

            };

        }])
    .controller('CreateCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.post = {};

            $scope.doCreatePostAction = function() {


                UserService.init();

                UserService.createPost($scope.post);
            };
        }])
    .controller('ProfileCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {
            
            $scope.doLogoutAction = function() {
                Parse.User.logOut();
                $state.go('app-login', {
                    clear: true
                });
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
                            var createId = post.get('Creator');
                            var name = post.get('Name');
                            var desc = post.get('Description');

                            var time = new Date();
                            time = post.get('Time');
                            var hour = time.getHours();
                            var min = time.getMinutes();

                            var json = {
                                "createId": createId,
                                "name": name,
                                "hour": hour,
                                "min": min,
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

            $scope.note = {
                receiver: '',
                receiverName: ''
            };

            $scope.doCreateNoteAction = function(note) {

                UserService.init();

                UserService.createNote(note);
            };

            
            $scope.doRefreshAction = function() {
                refresh();
            };

            $scope.detailAction = function() {
                refresh();
            };

            $scope.contact = {
                name: 'id',
                info: 'Tap anywhere on the card to open the modal',
                createId: ''
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

                $scope.contact.createId = user.createId;

                $scope.note.receiver = user.createId;

                $scope.note.receiverName = user.name;

                $scope.modal.show()
            };

            $scope.closeModal = function() {
                $scope.modal.hide();
            };

            $scope.respondModal = function() {
                alert($scope.contact.createId);
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
