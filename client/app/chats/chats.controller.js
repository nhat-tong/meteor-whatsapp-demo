/**
 * Created by htong on 01/03/2016.
 */

(function () {
    'use strict';

    angular.module('Whatsapp')
           .controller('ChatsCtrl', ChatsController);

    //@ngInject
    function ChatsController($scope, $reactive, ChatSvc) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.remove = remove;
        vm.showChatModal = showChatModal;

        activate();

        function activate() {
            Meteor.subscribe('chats');
            vm.helpers({
                chats: () => {
                    var data = whatsapp.collections.chats.find({}).fetch();
                    console.log(data);
                    return data;
                }
            });
        }

        function showChatModal() {
            ChatSvc.showModal();
        }

        function remove(chat) {
            whatsapp.methods.removeChat.call({
                chatId: chat._id
            },(err,res) => {
                if(err) {
                   return handleError(err);
                }
                vm.chats.splice(vm.chats.indexOf(chat), 1);
                $scope.$apply();
            });
        }

        function handleError(err) {
            console.log(err.reason);
        }
    }

})();