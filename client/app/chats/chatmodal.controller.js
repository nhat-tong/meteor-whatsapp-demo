/**
 * Created by htong on 07/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .controller('ChatModalCtrl', ChatModalController);

    //@ngInject
    function ChatModalController($scope, $reactive, ChatSvc, $state, $log) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.hideChatModal = hideChatModal;
        vm.createChat = createChat;

        activate();

        function activate() {
            // subscribe to users collection published by server
            vm.subscribe('users');
            vm.helpers({
                users: function() {
                    return Meteor.users.find({_id: { $ne: Meteor.userId() }});
                }
            });
        }

        function hideChatModal() {
            ChatSvc.hideModal();
        }

        function createChat(userId) {
            let chat = whatsapp.collections.chats.findOne({type:'chat', userIds:{$all: [Meteor.userId(), userId]}});
            if(chat) {
                return gotoChat(chat._id);
            }

            whatsapp.methods.createNewChat.call({
                otherId: userId
            }, (err,chatId) => {
                if(!err) {
                    return gotoChat(chatId);
                }
            });
        }

        function gotoChat(chatId) {
            ChatSvc.hideModal();
            return $state.go('tab.chat', {chatId: chatId});
        }
    }
})();