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
            chat_ref: db.ref("/chat"),
            assessment_ref: db.ref("/automated_assessment")
        };
    })

    .factory('User', function (Database, $q, $rootScope) {
        var me;
        var myProfile;
        
        return {
            me: function () {
                return me;
            },
            initMyProfile: function(cb){
                Database.user_ref.child(me.uid).on("value",function(snapshot){
                    if(snapshot.val() != null){
                        
                        myProfile = snapshot.val();

                        cb();
                    }
                })
            },
            myProfile:function(){
                return myProfile;
            },
            clearMe: function () {
                me = null;
            },
            setRoom: function(roomId){
                Database.user_ref.child(me.uid).update({
                    roomId: roomId
                })
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
                        Database.user_ref.child(me.uid).update({
                            last_seen: firebase.database.ServerValue.TIMESTAMP
                        })
                        console.log("AUTH SUCCESS")
                        ////console.log("setting me in cache: ",me);
                        //LocalStorageService.setCacheValue("me",me);
                        // deff.resolve(authData);
                        return Promise.resolve(authData);
                    }).then(function (error) {
                        console.log("AUTH FAIL")
                        //this is where we will get incorrect login
                        console.error(error);
                        // deff.resolve(error);
                        return Promise.resolve(error);
                        // return error;
                    });

            }
        }

    }).factory('AutomatedAssessment',function(Database){
        return{
            getTests: function(questionNumber){
            Database.automated_assessment.child(questionNumber).once("value",function(snapshot){
                return snapshot.val();
            });
            }
        }


    });