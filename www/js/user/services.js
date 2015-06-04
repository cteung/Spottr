angular.module('user.services', [])

    .service('UserService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

            var parseInitialized = false;


            return {

                /**
                 *
                 * @returns {*}
                 */
                init: function () {

                    debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                /**
                 *
                 * @param _userParams
                 */
                createUser: function (_userParams) {

                    var user = new Parse.User();
                    user.set("username", _userParams.email);
                    user.set("password", _userParams.password);
                    user.set("email", _userParams.email);
                    user.set("name", _userParams.name);

                    // should return a promise
                    return user.signUp(null, {});

                },
                /**
                 *
                 * @param _parseInitUser
                 * @returns {Promise}
                 */
                currentUser: function (_parseInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                    console.log("_parseInitUser " + Parse.User.current());
                    if (!_parseInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_parseInitUser);
                    }
                },
                /**
                 *
                 * @param _user
                 * @param _password
                 * @returns {Promise}
                 */
                login: function (_user, _password) {
                    return Parse.User.logIn(_user, _password);
                },
                /**
                 *
                 * @returns {Promise}
                 */
                logout: function (_callback) {
                    var user = Parse.User.current();
                    if (null !== user) {
                        console.log("logging out user " + user.get("username"));
                    }
                    return Parse.User.logOut();
                },

                createPost: function(_postParams) {

                    var Post = Parse.Object.extend("Post");
                    var p = new Post();
                    var name;

                    Parse.User.current().fetch().then(function (user) {
                        name = user.get('name');
                    });

                    alert("Creating Post");

                    var hour = _postParams.postHour

                    var now = new Date();
                    var later = new Date(now.getTime() + (hour*1000*60*60));

                    
                    p.set("Time", later);
                    p.set("Description", _postParams.postDesc);
                    p.set("Creator", Parse.User.current().id);
                    p.set("Name", name);
                    

                    p.save(null, {
                      success: function(p) {
                        // Execute any logic that should take place after the object is saved.
                        // alert('New object created with objectId: ' + p.id);
                      },
                      error: function(p, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                      }
                    });

                },


                createNote: function(_noteParams) {

                    var Note = Parse.Object.extend("Note");
                    var n = new Note();

                    var name;
                    Parse.User.current().fetch().then(function (user) {
                        name = user.get('name');
                    });

                    alert("Sending Notification");

                    //n.set("Sender", _noteParams.noteSender);
                    n.set("Sender", Parse.User.current().id);
                    n.set("senderName", name);
                    n.set("Receiver", _noteParams.receiver);
                    n.set("receiverName", _noteParams.receiverName);
                    n.set("Message", _noteParams.noteMessage);

                    n.save(null, {
                      success: function(p) {
                        // Execute any logic that should take place after the object is saved.
                        // alert('New object created with objectId: ' + p.id);
                      },
                      error: function(p, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                      }
                    });

                }

            }
        }]);
