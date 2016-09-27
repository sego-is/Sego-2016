'use strict'

angular.module('sego').controller('DailyBookingCtrl', ['$scope', function ($scope) {
    $scope.open = function() {
      console.log("rassgat");
    };
    const start_time = 7, end_time = 23;

    $scope.names = [ { 
    	'id':1,
    	'name':'Einar' 
    }, { 
    	'id':2,
    	'name':'Siggi'
    }, { 
    	'id':3,
    	'name':'Efro' 
    }, { 
    	'id':4,
    	'name': 'Kaplo' 
    }, { 
    	'id':5,
    	'name':'Ostaran' 
    }, { 
    	'id':6,
    	'name': 'Mandalana' 
    }];
    $scope.booking = [];
}])
.directive('privateChat', function() {
	return {
        restrict: 'E',
        templateUrl: 'views/private.html',
        transclude: true,
        scope: {
            userInfo: '=info',
            quitChat: '&onQuit'
        },
        link: function(scope, element, attrs) {
            scope.privateMessage = {
                nick: scope.userInfo.key,
                message: ""
            };
            
            scope.closeWindow = function() {
                scope.quitChat();
            };
                        
            scope.chatHistory = user.getPrivateChatFromUser(scope.privateMessage.nick);
            
            scope.sendPrivate = function() {
                var currMsg = scope.privateMessage.message;
                if (currMsg.length > 0) {
                    scope.privateMessage.message = user.getUsername() + ": " + currMsg;
                    user.addMessage(scope.userInfo.key, scope.privateMessage.message);
                    helpfunctions.sendPrivate(scope.privateMessage);
                }
                scope.privateMessage.message = "";
            };
        }
     };
});