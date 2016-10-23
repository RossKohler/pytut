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

            savedEx: function (ex, q) {
              return myProfile.saved["exercise"+ex]["question"+q];
            },

            currentEx: function(){
              return "exercise"+myProfile.current.exercise + "task" + myProfile.current.question;
            },

            updateSaved: function (code, ex, q){
              var updates ={};
              updates["/saved/exercise"+ex+"/question"+ q+"/"] = code;
              Database.user_ref.child(me.uid).update(updates);

            },

            updateCurrent: function (ex,q){

              var updates ={};
              updates["/current/exercise/"] = ex;
              updates["/current/question/"] = q;
              Database.user_ref.child(me.uid).update(updates);
            },

            initMyProfile: function(cb){

                Database.user_ref.child(me.uid).on("value",function(snapshot){
                    if(snapshot.val() != null){
                        myProfile = snapshot.val();

                        cb("E" +myProfile.current.exercise +"T"+myProfile.current.question);

                    }
                })


                Database.user_ref.child(me.uid).once('value').then(function(snapshot) {
                  var saved = snapshot.val().saved;
                  // set up database to track work and progress
                  
                  if(saved == undefined)
                  {

                    Database.user_ref.child(me.uid).update({
                      current: {
                        "exercise" : 1,
                        "question" : 1
                      },

                      saved: {
                        "exercise1" : {
                          "question1" : "",
                          "question2" : "",
                          "question3" : ""
                        },
                        "exercise2" : {
                          "question1" : "",
                          "question2" : "",
                          "question3" : ""
                        }
                      }


                    })
                  }
                });

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
                    }).catch(function (error) {
                        console.log("AUTH FAIL")
                        //this is where we will get incorrect login
                        console.error(error);
                        // deff.resolve(error);
                        return Promise.resolve(error);
                        // return error;
                    });

            }
        }

    })

    .factory('AutomatedAssessment',function(Database){
        return{
            getTests: function(questionNumber){
            Database.automated_assessment.child(questionNumber).once("value",function(snapshot){
                return snapshot.val();
            });
            }
        }


    });
