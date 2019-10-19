var emailPattern =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm,
    passwordPattern = /^[a-zA-Z0-9]{6,30}$/;

app.controller("loginController", function($scope,$window,userService)
{
   $scope.submit = () =>
   {
      if(!emailPattern.test($scope.username) && !passwordPattern.test($scope.password))
         return;

      var data = {
         email : $scope.username,
         password : $scope.password
      }
      userService.login(data).
      then(function(response)
      {
         alert('Login successful');
         console.log(response);
         console.log(response.data._id)
         console.log(response.data.firstName);
         sessionStorage.setItem('UserID',response.data._id);
         sessionStorage.setItem('Username',response.data.firstName);
         $window.location.href = 'http://localhost:3000/#!/dashboard';  
      }).catch(function(response)
      {
         alert("enter valid credentials");
         console.log(response);
      })
   }

});

app.controller("registerController", function($scope,userService)
{
   $scope.submit = () =>
   {
      if(!emailPattern.test($scope.username) && !passwordPattern.test($scope.password))
         return;

      var data = {
         firstName:$scope.first,
         lastName:$scope.last,
         email : $scope.username,
         password : $scope.password
      }
      userService.register(data).
      then(function(response)
      {
         alert('Registration successful');
         console.log(response.data);
         $window.location.href = 'http://localhost:3000/#!/login';
      }).catch(function(response)
      {  
         alert('Registration unsuccessful');
         console.log(response.data);
      })
   }

});


app.controller("forgotController", function($scope,userService)
{
   $scope.submit = () =>
   {
      if(!emailPattern.test($scope.username))
         return;

      var data = {
         email : $scope.username,
      }
      userService.forgotPassword(data).
      then(function(response)
      {
         alert('Reset link has been sent to your email');
         console.log(response);
      }).catch(function(response)
      {
         console.log(response.data);
      })
   }

});

app.controller("resetController", function($scope,$stateParams,userService)
{
   $scope.submit = () =>
   {  
      if(!passwordPattern.test($scope.old) && !passwordPattern.test($scope.new))
         return;
      
      $scope.token = $stateParams.result;
      var data = {
         token:$scope.token,
         password:$scope.old,
         password_new:$scope.new
      }
      userService.resetPassword(data).
      then(function(response)
      {
         alert('Password reset successful');
         console.log(response.data);
      }).catch(function(response)
      {
         console.log(response.data);
      })
   }
});




