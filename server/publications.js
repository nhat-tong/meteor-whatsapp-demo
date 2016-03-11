/**
 * Created by htong on 11/03/2016.
 */

(function(){
    'use strict';

    Meteor.publish('users', function(){
        return Meteor.users.find({}, { fields: { profile: 1 }});
    });

    Meteor.publishComposite('chats', function() {
        if(!this.userId) {
            return;
        }

        // add messages and users that are related to the chats
        return {
            find() {
                return whatsapp.collections.chats.find({ userIds: this.userId });
            },
            children: [
                {
                    find(chat) {
                        return whatsapp.collections.messages.find({ chatId: chat._id });
                    }
                },
                {
                    find(chat) {
                        let query = { _id: { $in: chat.userIds }};
                        let options = { fields: { profile: 1 }};

                        return Meteor.users.find(query, options);
                    }
                }
            ]
        };
    });
})();