angular
    .module('myTodoProjectApp', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../static/todo.html',
                controller: 'TodoCtrl'
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
            $scope.state.todoList = [];
            $scope.state.retrieveNr = $scope.RETRIEVE_DEFAULT_NR;

            // Add new todo to DB with checked value set to false
            $scope.addTodo = function () {
                if (!$scope.state.newTodo) {
                    windowAlert("text field must be non-empty");
                } else {
                    $http
                        .post('/todoAdd', {
                            item: $scope.state.newTodo,
                            value: 0
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
                $scope.state.newTodo = "";
            };
            // Retrieves todos from DB. How many depends on the variable RETREIVE_DEFAULT_NR
            $scope.retrieveTodos = function (n) {
                $http
                    .get('/todoRetrieve/' + n)
                    .success(function (data, status, headers, config) {
                        if (data.success) {
                            $scope.state.todoList = data.todoList;

                            $scope.state.todoList.forEach(function (todo) {
                                if(todo['value'] == 1)
                                    todo.done = true;
                            });
                        } else {
                            windowAlert('Retrieval failed');
                        }
                    })
                    .error(function (data, status, headers, config) {
                        windowAlert("Retrieval failed");
                    });
            };
            // Marks all visible todos to be completed. Updates DB.
            $scope.markAllAsComplete = function () {
                console.log("Mark all as Complete: ");
                $scope.state.todoList.forEach(function (todo) {
                    todo.done = true;
                    $http
                        .post('./addValue', {
                            id: todo['id'],
                            value: 1
                        });
                });
            };
            //Controlls when checkbox is checked
            $scope.$watch( "state.todoList" , function(n,o) {
                    var trues = $filter("filter")( n , {done:true} );
                     $scope.flag = $scope.state.todoList.length - trues.length;
                },true
            );
            // When checkbox is checked or unchecked, the DB is updated
            $scope.addValue = function (id, value) {
                $http
                    .post('./addValue', {
                        id: id,
                        value: value
                    });
            };
            //Get all the todos from DB when loading page -- FIRST thing that happens
            $scope.retrieveTodos($scope.RETRIEVE_DEFAULT_NR);
        }
    ]);

