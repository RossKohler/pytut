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
       _editor.setValue("print 10", 1);// change to different value acc exercise
       aceHl = _editor;
       //$scope.detailFrame = $sce.trustAsResourceUrl("http://pythontutor.com/iframe-embed.html#code=x+%3D+5&cumulative=false&py=3&curInstr=0");
     };

     $scope.aceChanged = function(e) {
       var placeHere = document.getElementById("frameHere");
       placeHere.innerHTML="";
     };
      function outf(text) {
          var mypre = document.getElementById("output");
          mypre.innerHTML = mypre.innerHTML + text;
      }

     function builtinRead(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
              throw "File not found: '" + x + "'";
          return Sk.builtinFiles["files"][x];
      }

      $scope.debugit = function() {
        console.log(aceHl.getSession());
        var placeHere = document.getElementById("frameHere");

        console.log("trying to add iframe");
        var iframe = document.createElement('iframe');
        iframe.style.display = "inline";
        iframe.id ="debugger";
        iframe.width="500px";
        iframe.height="300px";
        var url = "http://pythontutor.com/iframe-embed.html#code=" + encodeURIComponent(aceHl.getValue())+ "&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=false&origin=opt-frontend.js&py=2&rawInputLstJSON=%5B%5D&textReferences=false";
        iframe.src = url;
        console.log(url);
        placeHere.appendChild(iframe);

      }

      $scope.runit = function() {
          // analytics: record user ID, timestamp, execution, successful/unsuccessful run
          // if unsuccessful record what kind of error was returned
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
      }

      $scope.stepIn = function()
      {
          // analytics: record user ID, timestamp, stepping was used
          console.log("Step into program");
      }

      $scope.chat = function() {
          // analytics: record user ID, timestamp, chat was initiated
          console.log("Initiate Chat");
      }

      $scope.mark = function() {
          console.log("Submit for automatic marking");
          // analytics: record user ID, timestamp, marking was inititated, success/failure?
      }



    });
