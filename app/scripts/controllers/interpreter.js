'use strict';

angular.module('yapp')
    .controller('pythonInterpreterCtrl', function (Database, $window, $location, User, $scope, $state, $sce) {

    $scope.$state = $state;
    var Sk = $window.Sk;

    var aceHl;

    $scope.frameURL = $sce.trustAsResourceUrl("http://pythontutor.com/iframe-embed.html#code=%23%20this%20is%20the%20debugger&cumulative=false&py=3&curInstr=0");

    $scope.aceLoaded = function(_editor) {
   // Options
       _editor.setReadOnly(false);
       _editor.setValue("", 1);// change to different value acc exercise
       aceHl = _editor;
       //$scope.detailFrame = $sce.trustAsResourceUrl("http://pythontutor.com/iframe-embed.html#code=x+%3D+5&cumulative=false&py=3&curInstr=0");
     };

     $scope.aceChanged = function(e) {
       clearAll();
       //var placeHere = document.getElementById("frameHere");
       //placeHere.innerHTML="";
     };

      function outf(text) {
          var mypre = document.getElementById("output");
          mypre.innerHTML = mypre.innerHTML + text;
      }
      function userInput(){

      }

     function builtinRead(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
              throw "File not found: '" + x + "'";
          return Sk.builtinFiles["files"][x];
      }

      $scope.debugit = function() {
        // must run program to check that there are no syntax errors before debugging
        var prog = aceHl.getValue();
        var mypre = document.getElementById("output");

        mypre.innerHTML = '';
        Sk.pre = "output";
        Sk.configure({ output: outf, read: builtinRead });
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
        var myPromise = Sk.misceval.asyncToPromise(function () {
            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });

        myPromise.then(function (mod) {
          clearAll();
          document.getElementById("debHd").style.visibility="visible";
          var placeHere = document.getElementById("frameHere");
          var iframe = document.createElement('iframe');
          iframe.style.display = "inline";
          iframe.id ="debugger";
          iframe.width="90%";
          iframe.height="600px";
          var url = "http://pythontutor.com/iframe-embed.html#code=" + encodeURIComponent(aceHl.getValue())+ "&codeDivHeight=400&codeDivWidth=550&cumulative=false&curInstr=0&heapPrimitives=false&origin=opt-frontend.js&py=2&rawInputLstJSON=%5B%5D&textReferences=false";
          iframe.src = url;
          placeHere.appendChild(iframe);
        },
            function (err) {
              var mypre = document.getElementById("output");
              mypre.innerHTML = "Cannot debug with syntax errors: \n" +mypre.innerHTML + err.toString();
            });
          console.log("debugging");
      };

      $scope.runit = function() {
          clearAll();
          var prog = aceHl.getValue();
          var mypre = document.getElementById("output");

          mypre.innerHTML = '';
          Sk.pre = "output";
          Sk.configure({ output: outf, read: builtinRead });
          (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
          var myPromise = Sk.misceval.asyncToPromise(function () {
              return Sk.importMainWithBody("<stdin>", false, prog, true);
          });
          myPromise.then(function (mod) {
              console.log('success');
          },
              function (err) {
                  var mypre = document.getElementById("output");
                  mypre.innerHTML = mypre.innerHTML + err.toString();
              });
          console.log('+1 to number of runs for analytics');
      };

      $scope.mark = function(question, functionName) {
           var mypre = document.getElementById("output");
           mypre.innerHTML = "";

          console.log("Submit for automatic marking");
          var prog = aceHl.getValue();
        try {
            //var module = Sk.importMainWithBody("<stdin>", false, prog);
            console.log(question);
            Database.assessment_ref.child(question).once("value",function(snapshot){
                var tests = snapshot.val();
                if(question == "question 1"){
                    mypre.innerHTML = "**MARKING QUESTION 1**\n"
                    var keys = Object.keys(tests);
                    console.log(keys);
                    for(var i=0; i< keys.length;i++){
                        mypre.innerHTML = mypre.innerHTML+"Running test "+(i+1)+":\n";
                        var test = tests[keys[i]];
                        var input = test.input;
                        var output = test.output;

                        mypre.innerHTML =  mypre.innerHTML+"input: "+input+"\n"
                        mypre.innerHTML = mypre.innerHTML+"expected output:\n"
                        mypre.innerHTML = mypre.innerHTML+output+"\n"
                        


                        
                       // result = progOutput.v;

                        /*if(result == output){
                            console.log("CORRECT")
                        }*/

                    }

                }
                else if(question == "question 2"){


                }
                else if(question == "question 3"){



                }

            });




            //console.log();

        } catch (e) {
            console.error(e)
        }
          // analytics: record user ID, timestamp, marking was inititated, success/failure?
      };
      function clearAll()
      {
        var placeHere = document.getElementById("frameHere");
        placeHere.innerHTML=""; // clear previous debugging console
        document.getElementById("debHd").style.visibility="hidden";
        var mypre = document.getElementById("output");
        mypre.innerHTML = "";
      }
    });
