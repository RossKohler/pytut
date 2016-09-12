angular.module('starter.services', [])

    .factory('Database', function () {

        var config = {
            apiKey: "AIzaSyAsfClYaSXl30U-Wn2yY7ig6dzBmBVdu6o",
            authDomain: "pytut-eedf2.firebaseapp.com",
            databaseURL: "https://pytut-eedf2.firebaseio.com",
            storageBucket: "pytut-eedf2.appspot.com",
        };
        firebase.initializeApp(config);
        var db = firebase.database();
        return {
            db: db,
            user_ref: db.ref("/users"),
            chat_ref: db.ref("/chat")
        };
    })

    .factory('User', function (Database, $q, $rootScope) {
        var me;
        return {
            me: function () {
                return me;
            },
            clearMe: function () {
                me = null;
            },
            login: function (email, password) {
                var firebaseAuth = firebase.auth();
                if (me)
                    return Promise.resolve(me);
                var deff = $q.defer();
                // isLoading = true;
                return firebaseAuth.signInWithEmailAndPassword(email, password)
                    .then(function (authData) {
                        //addUserToFirebaseUsers(authData);
                        me = authData;
                        Database.user_ref.child(me.uid).set({
                            last_seen: firebase.database.ServerValue.TIMESTAMP
                        })
                        ////console.log("setting me in cache: ",me);
                        //LocalStorageService.setCacheValue("me",me);
                        // deff.resolve(authData);
                        return Promise.resolve(authData);
                    }).catch(function (error) {
                        //this is where we will get incorrect login
                        console.error(error);
                        // deff.resolve(error);
                        return Promise.resolve(error);
                        // return error;
                    });

            }
        }

    })