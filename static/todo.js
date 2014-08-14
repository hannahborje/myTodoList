angular
    .module('myTodoProjectApp', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../static/todo.html',
                controller: 'TodoCtrl'
            })
            .when('/secondPage', {
                templateUrl: '../static/secondPage.html',
                controller: 'SecondController'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .factory('windowAlert', [
        '$window',
        function($window) {
            return $window.alert;
        }
    ])
    .controller('TodoCtrl', [
        '$scope',
        '$http',
        '$filter',
        'windowAlert',
        function($scope, $http, $filter, windowAlert) {
            $scope.RETRIEVE_DEFAULT_NR = 5;
            $scope.state = {};
            $scope.trueValue = 'true';
            $scope.state.todoList = [];
            $scope.state.retrieveNr = $scope.RETRIEVE_DEFAULT_NR;


            $scope.addTodo = function () {
                  if (!$scope.state.newTodo) {
                    windowAlert("text field must be non-empty");
                } else {
                    $http
                        .post('/todoAdd', {
                            item: $scope.state.newTodo,
                            value: 'false'
                        })
                        .success(function (data, status, headers, config) {
                            if (data.success) {
                                $scope.retrieveTodos(
                                    $scope.state.retrieveNr
                                );
                            } else {
                                windowAlert('Adding of item failed');
                            }
                        })
                        .error(function (data, status, headers, config) {
                        });
                }
            };
            $scope.retrieveTodos = function (n) {
                $http
                    .get('/todoRetrieve/' + n)
                    .success(function (data, status, headers, config) {
                        if (data.success) {
                            $scope.state.todoList = data.todoList;
                            } else {
                            windowAlert('Retrieval failed');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        windowAlert("Retrieval failed");
                    });
            };

            $scope.retrieveDone = function () {
                $http
                    .get('/doneRetrieve')
                    .success(function (data, status, headers, config) {
                        if (data.success) {
                            $scope.state.todoList = data.todoList;

                            } else {
                            windowAlert('Retrieval failed');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        windowAlert("Retrieval failed");
                    });
            };

//return number of all todos that is not completed ****DELETA?
            $scope.getTotalTodos = function () {
                var count = 0;
                $scope.state.todoList.forEach(function (todo) {
                    if (todo.done === false) {
                        count += 1;
                    }
                });
                return count;
            };
            $scope.markAllAsComplete = function () {
                console.log("Mark all as Complete: ");
                $scope.state.todoList.forEach(function (todo) {
                    todo.done = true;
                });
            };
            //Controll when checkbox is checked
             $scope.$watch( "state.todoList" , function(n,o) {
                     var trues = $filter("filter")( n , {done:true} );
                     $scope.flag = $scope.state.todoList.length - trues.length;
                 },true
              );

            $scope.addValue = function (value) {
                   if (value === true) {
                       $http
                           .post('./addValue', {
                               value: 'true',
                               id: 9
                           });
                   }

            };
            //Get all the todos from DB when loading page
            $scope.retrieveTodos(5);
        }
    ]);

