app.controller('chatController', function($scope,$location,chatService,userService,SocketService) 
{
    $scope.msgData = [];
    $scope.currUser = sessionStorage.getItem('Username');
    $scope.currUserId=sessionStorage.getItem('UserID');
    let message = document.getElementById('message')
    $scope.getUser = (item) =>
    {  
        sessionStorage.setItem('receiverID',item._id);
        sessionStorage.setItem('receiverName',item.firstName);
        // $scope.username = item.firstName;
        $scope.getUserMessage();
    }

    $scope.getUserMessage = function () {
        chatService.getUserMsg($scope);
    }

    //chatService.emit('room', { roomId: $scope.id});

    userService.getallUsers().
    then(res=>
        {
            $scope.users = res.data;
        })
    .catch(err=>
        {
            console.log(err);
        });
     
    $scope.sendMsg = function() {
        let sendMsgData={
        senderName : sessionStorage.getItem('Username'),
        senderId : sessionStorage.getItem('UserID'),
        receiverName : sessionStorage.getItem('receiverName'),
        receiverId : sessionStorage.getItem('receiverID'),
        message:$scope.msg
        }
        SocketService.emit("newMsg", sendMsgData);
        $scope.msgData.push(sendMsgData);
    }

    var senderId = sessionStorage.getItem('UserID');
    SocketService.on(senderId, function (message) {
        console.log('Message emitted');
        
        if (sessionStorage.getItem('receiverID') == message.senderId) 
        {
            if ($scope.msgData === undefined) 
             {
                $scope.msgData = message;
               
             }
            else 
                $scope.msgData.push(message);
                
        }
    })

    $scope.clearTextArea = function () {
        $scope.msg = '';
    }

    $scope.logout = function(){
        $location.path('/login'); 
    }

})