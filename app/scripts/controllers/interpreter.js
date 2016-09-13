'use strict';

angular.module('yapp')
    .controller('pythonInterpreterCtrl', function (Database, $window, $location, User, $scope, $state) {

    $scope.$state = $state;
    var Sk = $window.Sk;

    var aceHl;

    $scope.aceLoaded = function(_editor) {
   // Options
       _editor.setReadOnly(false);
       _editor.setValue("print 10", 1);// change to different value acc exercise
       aceHl = _editor;

     };

     $scope.aceChanged = function(e) {

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
          console.log("Debug program");
          // analytics: record user ID, timestamp, debugging was initiated
      }

      $scope.runit = function() {
          // analytics: record user ID, timestamp, execution, successful/unsuccessful run
          // if unsuccessful record what kind of error was returned
          var prog = aceHl.getValue();
          console.log("Value of ace is "+aceHl.getValue());
          console.log(prog);
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

        function outf(text) {
            var mypre = document.getElementById("output");
            mypre.innerHTML = mypre.innerHTML + text;
        }

        function builtinRead(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        }

        $scope.debugit = function () {
            console.log("Debug program");
            // analytics: record user ID, timestamp, debugging was initiated
        }

        $scope.stepIn = function () {
            // analytics: record user ID, timestamp, stepping was used
            console.log("Step into program");
        }

        $scope.chat = function () {
            // analytics: record user ID, timestamp, chat was initiated
            console.log("Initiate Chat");
        }

        $scope.mark = function () {
            console.log("Submit for automatic marking");
            // analytics: record user ID, timestamp, marking was inititated, success/failure?
        }

    });
