/**
 * Created by htong on 02/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .controller('ChatCtrl', ChatController);

    //@ngInject
    function ChatController(chat, $scope, $reactive, $ionicScrollDelegate, $timeout) {
        var vm = this;
        // This method attaches the context to scope - we need to attach to scope in order to $apply it when changes are made,
        // in order to update the view.
        $reactive(vm).attach($scope);

        vm.sendMessage = sendMessage;
        vm.sendPicture = sendPicture;
        vm.closeKeyboard = closeKeyboard;
        vm.inputUp = inputUp;
        vm.inputDown = inputDown;

        let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

        activate();

        function activate() {
            // all reactive vars and function there
            vm.helpers({
                message: () => {
                    return '';
                },
                messages: () => {
                    return whatsapp.collections.messages.find({chatId: chat._id});
                }
            });

            $scope.$watchCollection('vm.messages', function(newValue, oldValue){
                let isAutoScroll = newValue.length !== oldValue.length;
                $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(isAutoScroll);
            });
        }

        function sendMessage() {
            let msg = new whatsapp.models.message(chat._id, 'text', vm.message, null);
            whatsapp.methods.sendMessage.call({
                message: msg
            }, (err, res) => {
                if(err) {
                    return handleError(err);
                }
                vm.message = '';
            });
        }

        function sendPicture() {
            MeteorCameraUI.getPicture({ width: 60, height: 60 }, (err,data) => {
                if(err && err.error === 'cancel') {
                    return;
                }
                if(err) {
                    return handleError(err);
                }

                let msg = new whatsapp.models.message(chat._id, 'picture', null, data);
                whatsapp.methods.sendMessage.call({
                    message: msg
                }, (err) => {
                    if(err) {
                        return handleError(err);
                    }
                });
            });
        }

        function closeKeyboard() {
        }

        function inputUp() {
            if (isIOS) {
                this.keyboardHeight = 216;
            }

            $timeout(function() {
                $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
            }, 300);
        }

        function inputDown() {
            if (isIOS) {
                this.keyboardHeight = 0;
            }

            $ionicScrollDelegate.$getByHandle('chatScroll').resize();
        }

        function handleError(error) {
            console.log(error.reason);
        }
    }
})();