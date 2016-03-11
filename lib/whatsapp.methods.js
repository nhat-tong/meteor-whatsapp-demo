/**
 * Created by htong on 03/03/2016.
 */

whatsapp = whatsapp || {};
whatsapp.methods = {
    // add new message
    sendMessage: (function(){
        return new ValidatedMethod({
            // The name of the method
            name: 'whatsapp.methods.sendMessage',

            // Validation function for the arguments
            validate({ message }) {
                check(message, Match.OneOf({
                    chatId: String,
                    type: String,
                    text: String,
                    picture: null
                }, {
                    chatId: String,
                    type: String,
                    text: null,
                    picture: String
                }));
            },

            //body of the method
            run({ message }) {
                // `this` is the same method invocation object you normally get inside Meteor.methods
                if(!this.userId) {
                    throw new Meteor.Error('whatsapp.methods.sendMessage.error.login-required', 'Please log in to send message');
                }

                //2. Execute logic
                message.timestamp = new Date();
                message.userId = this.userId;

                let messageId = whatsapp.collections.messages.insert(message);
                whatsapp.collections.chats.update(message.chatId, { $set: { lastMessage: message } });
                return messageId;
            }
        });
    })(),

    // update nick name
    updateName: (function(){
        return new ValidatedMethod({
            name: 'whatsapp.methods.updateName',
            validate({ name }) {
                check(name, String);

                if(_.isEmpty(name)) {
                    throw new ValidationError({
                        name: name,
                        type: 'custom-validation-error',
                        reason: 'Name can not empty. Please enter a correct name',
                        details: {
                            value: 'Name can not empty. Please enter a correct name'
                        }
                    });
                }
            },
            run({ name }){
                console.log(this);
                if(!this.userId) {
                    throw new Meteor.Error('whatsapp.methods.updateName.error.login-required', 'Please log in to update his name');
                }

                return Meteor.users.update(this.userId, { $set: {'profile.name': name }});
            }
        });
    })(),

    // Update picture profile
    updatePicture: (function(){
        return new ValidatedMethod({
            name: 'whatsapp.methods.updatePicture',
            validate({ picture }) {
                check(picture, String);
            },
            run({ picture }){
                if(!this.userId) {
                    throw new Meteor.Error('whatsapp.methods.updatePicture.login-required', 'Must to login to update picture');
                }

                return Meteor.users.update(this.userId, { $set: {'profile.picture': picture }});
            }
        });
    })(),

    // create a new chat
    createNewChat: (function(){
        return new ValidatedMethod({
            name: 'whatsapp.methods.createNewChat',
            validate({ otherId }){
                check(otherId, String);
            },
            run({ otherId }){
                if(!this.userId) {
                    throw new Meteor.Error('whatsapp.methods.createNewChat.error.login-required', 'Must to login to create chat');
                }
                let otherUser = Meteor.users.findOne(otherId);
                if(!otherUser) {
                    throw new Meteor.Error('whatsapp.methods.createNewChat.error.user-not-existed', 'Chat user ' + otherId +  ' was not existed');
                }

                let newChat = new whatsapp.models.chat('chat', [this.userId, otherId], new Date());
                return whatsapp.collections.chats.insert(newChat);
            }
        });
    })(),

    //remove a chat from db
    removeChat: (function(){
        return new ValidatedMethod({
            name: '',
            validate({chatId}){
                check(chatId, String)
            },
            run({chatId}){
                if(!this.userId) {
                    throw new Meteor.Error('whatsapp.methods.createNewChat.error.login-required', 'Must to login to create chat');
                }
                let chat = whatsapp.collections.chats.findOne(chatId);
                if(!chat || !_.include(chat.userIds, this.userId)) {
                    throw new Meteor.Error('whatsapp.methods.createNewChat.error.chat-not-existed', 'Chat not exist');
                }

                whatsapp.collections.chats.remove({_id: chatId});
                whatsapp.collections.messages.remove({chatId: chatId});
            }
        });
    })()
}