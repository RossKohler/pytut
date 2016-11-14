'use strict';

angular.module('yapp')
    .controller('pythonInterpreterCtrl', function ($analytics, Database, $window, $location, User, $scope, $state, $sce) {
        $scope.showScore = false;
        $scope.input = ""
        var Sk = $window.Sk;

        var aceHl;

        $scope.frameURL = $sce.trustAsResourceUrl("http://pythontutor.com/iframe-embed.html#code=%23%20this%20is%20the%20debugger&cumulative=false&py=3&curInstr=0");
        //CKC - interactive code
        $scope.aceLoaded = function (_editor) {
            // Options
            _editor.setReadOnly(false);
            // CKC save and reload work
            _editor.setValue(User.savedEx($scope.exercise, $scope.question), 1);// set editor value to user's saved solution
            aceHl = _editor;

        };

        $scope.aceChanged = function (e) {
            clearAll();
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

         $scope.runit = function () {
            clearAll();
            var prog = aceHl.getValue();
            var mypre = document.getElementById("output");

            // save user work
            User.updateSaved(prog, $scope.exercise, $scope.question);

            mypre.innerHTML = '';
            Sk.pre = "output";
            Sk.configure({
                output: outf, read: builtinRead, inputfun: function (str) {
                    console.log($scope.input)
                    return $scope.input;
                },
                inputfunTakesPrompt: true
            });
            (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
            var myPromise = Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody("<stdin>", false, prog, true);
            });
            myPromise.then(function (mod) {

            },
                function (err) {
                    var mypre = document.getElementById("output");
                    mypre.innerHTML = mypre.innerHTML + err.toString();
                });

        };

        // CKC visual debugger
        $scope.debugit = function () {
            // must run program to check that there are no syntax errors before debugging
            clearAll();
            var prog = aceHl.getValue();
            var mypre = document.getElementById("output");

            mypre.innerHTML = '';
            Sk.pre = "output";
            Sk.configure({
                output: outf, read: builtinRead, inputfun: function (str) {
                    console.log($scope.input);
                    return $scope.input;
                },
                inputfunTakesPrompt: true
            });
            (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
            var myPromise = Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody("<stdin>", false, prog, true);
            });

            myPromise.then(function (mod) {
                clearAll();
                document.getElementById("debHd").style.visibility = "visible";
                var placeHere = document.getElementById("frameHere");
                var iframe = document.createElement('iframe');
                iframe.style.display = "inline";
                iframe.id = "debugger";
                iframe.width = "90%";
                iframe.height = "600px";
                var url = "https://pythontutor.com/iframe-embed.html#code=" + encodeURIComponent(aceHl.getValue()) + "&codeDivHeight=400&codeDivWidth=550&cumulative=false&curInstr=0&heapPrimitives=false&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false";
                iframe.src = url;
                placeHere.appendChild(iframe);
            },
                function (err) {
                    var mypre = document.getElementById("output");
                    mypre.innerHTML = "Cannot debug with syntax errors: \n" + mypre.innerHTML + err.toString();
                });
            console.log("debugging");
        };

       // RK automated marker
        $scope.automaticMark = function (question,exercise) {
            var finalResult = ""
            var mypre = document.getElementById("output");
            var prog = aceHl.getValue();
            mypre.innerHTML = "";

            console.log("Submit for automatic marking");
            var prog = aceHl.getValue();
            Database.assessment_ref.child(exercise).child(question).once("value", function (snapshot) {
                var tests = snapshot.val();
                var totalMark = snapshot.val().length - 1
                var mark = 0;
                mypre.innerHTML = "**MARKING QUESTION " + question + "**\n\n"
                var keys = Object.keys(tests);
                asyncLoop(keys.length, function (loop) {
                    var finalResult = "";

                    mypre.innerHTML = mypre.innerHTML + "Running test " + (loop.iteration() + 1) + ":\n";
                    var test = tests[keys[loop.iteration()]];
                    var input = test.input[0];
                    var output = test.output.toString();

                    mypre.innerHTML = mypre.innerHTML + "input: " + input + "\n"
                    mypre.innerHTML = mypre.innerHTML + "expected output:\n"
                    mypre.innerHTML = mypre.innerHTML + output + "\n"

                    Sk.configure({
                        output: function (result) {
                            finalResult += result
                        }, read: builtinRead, inputfun: function (str) {
                            return input
                        },
                        inputfunTakesPrompt: true
                    });
                    mypre.innerHTML = mypre.innerHTML + "what your program produced:\n"
                    Sk.misceval.asyncToPromise(function () {
                        return Sk.importMainWithBody("<stdin>", false, prog, true);
                    }).then(function () {
                        finalResult = finalResult.trim()

                        mypre.innerHTML = mypre.innerHTML + finalResult + "\n"

                        if (output === finalResult) {
                            mark++;
                            mypre.innerHTML = mypre.innerHTML + "Congratulations! Your program performed correctly for this test!\n";
                        }
                        else {
                            mypre.innerHTML = mypre.innerHTML + "Uh Oh! Your program didn't yield the correct result for this test!\n\nThe differences are as follows:\n";
                            var splitResult = finalResult.split('\n');
                            var splitOutput = output.split('\n');
                            if (splitResult.length > splitOutput.length) {
                                for (var i = 0; i < splitResult.length; i++) {
                                    if (i < splitOutput.length) {
                                        if (splitOutput[i] !== splitResult[i]) {
                                            mypre.innerHTML = mypre.innerHTML + "line "+ (i + 1) + ":" + splitOutput[i] + "  !=   " + splitResult[i] + "\n"
                                        }
                                    }
                                    else {
                                        mypre.innerHTML = mypre.innerHTML + "line "+(i + 1) + ": " + splitResult[i] + "\n"
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < splitOutput.length; i++) {
                                    if (i < splitResult.length) {
                                        if (splitOutput[i] !== splitResult[i]) {
                                            mypre.innerHTML = mypre.innerHTML + "line "+ (i + 1) + ": " + splitOutput[i] + "  !=   " + splitResult[i] + "\n"
                                        }
                                    }
                                    else {
                                        mypre.innerHTML = mypre.innerHTML + "line "+ (i + 1) + ": " + splitOutput[i] + "\n"
                                    }
                                }

                            }



                        }
                        mypre.innerHTML = mypre.innerHTML + "\n\n";
                        loop.next()
                    }, function (err) {
                        console.error(err);
                        var mypre = document.getElementById("output");
                        mypre.innerHTML = mypre.innerHTML + err.toString() + "\n\n";
                        loop.next()
                    })
                }, function () {
                    $analytics.eventTrack('AutomaticAssessment', { category: 'Result', label: question + " : " + ((mark / totalMark) * 100) + "%" });

                    $scope.$apply(function () {
                        $scope.showScore = true
                        $scope.mark = mark;
                        $scope.totalMarks = totalMark
                    })

                    console.log('cycle ended')

                })

            });

            // analytics: record user ID, timestamp, marking was inititated, success/failure?
        };
        function clearAll() {
            var placeHere = document.getElementById("frameHere");
            placeHere.innerHTML = ""; // clear previous debugging console
            document.getElementById("debHd").style.visibility = "hidden";
            var mypre = document.getElementById("output");
            mypre.innerHTML = "";
        }

        function asyncLoop(iterations, func, callback) {
            var index = 0;
            var done = false;
            var loop = {
                next: function () {
                    if (done) {
                        return;
                    }

                    if (index < iterations) {
                        index++;
                        func(loop);

                    } else {
                        done = true;
                        callback();
                    }
                },

                iteration: function () {
                    return index - 1;
                },

                break: function () {
                    done = true;
                    callback();
                }
            };
            loop.next();
            return loop;
        }
    });
function getDifference(a, b) {
    var i = 0;
    var j = 0;
    var result = "";

    while (j < b.length) {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}
