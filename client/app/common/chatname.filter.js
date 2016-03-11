/**
 * Created by htong on 08/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .filter('chatName', ChatNameFilter);

    //@ngInject
    function ChatNameFilter() {
        return function(chat) {
            if(!chat) return;

            let otherId = _.without(chat.userIds, Meteor.userId())[0];
            let otherUser = Meteor.users.findOne(otherId);
            let hasName = otherUser && otherUser.profile && otherUser.profile.name;

            return hasName ? otherUser.profile.name : chat.name || 'NO NAME';
        }
    }
})();