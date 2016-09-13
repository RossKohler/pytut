'use strict';

angular.module('yapp')
    .controller('pythonInterpreterCtrl', function (Database, $window, $location, User, $scope, $state) {

    $scope.$state = $state;
    var Sk = $window.Sk;

        $scope.$state = $state;
        var Sk = $window.Sk;

    var aceHl;

    $scope.aceLoaded = function(_editor) {
   // Options
       _editor.setReadOnly(false);
       _editor.setValue("def insertionSort(alist):\n\
    for index in range(1,len(alist)):\n\
        currentvalue = alist[index]\n\
        position = index\n\
        while position>0 and alist[position-1]>currentvalue:\n\
            alist[position]=alist[position-1]\n\
            position = position-1\n\
        alist[position]=currentvalue\n\
alist = [54,26,93,17,77,31,44,55,20]\n\
insertionSort(alist)\n\
print(alist)", 1);// change to different value acc exercise
       aceHl = _editor;
       console.log(aceHl);
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
                  console.log(err.toString());
                  var mypre = document.getElementById("output");
                  mypre.innerHTML = mypre.innerHTML + err;
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

        $scope.runit = function () {
            // analytics: record user ID, timestamp, execution, successful/unsuccessful run
            // if unsuccessful record what kind of error was returned
            var prog = $scope.editor
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
                    console.log(err.toString());
                });
            console.log('+1 to number of runs for analytics');
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
