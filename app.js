var app = angular.module("myApp",['ui.router','btford.socket-io']);
app.config(function($stateProvider,$urlRouterProvider)
{
    $urlRouterProvider.otherwise("/login");
    $stateProvider
    .state('login',
    {
        controller: "loginController",
        url:"/login",
        templateUrl:"templates/login.html"
        
    })
    .state('register',
    {
        url:"/register",
        templateUrl:"templates/registration.html",
        controller: "registerController"
    })
    .state('reset',
    {
        url:"/reset/:result",
        templateUrl:"templates/resetPassword.html",
        controller: "resetController"
    })
    .state('forgot',
    {
        url:"/forgot",
        templateUrl:"templates/forgotPassword.html",
        controller: 'forgotController'
    })
    .state('dashboard',
    {
        url:'/dashboard',
        templateUrl:'templates/dashboard.html',
        controller:'chatController'
    })
   
})

app.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:3000/')
    });

}]);
