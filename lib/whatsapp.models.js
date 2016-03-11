/**
 * Created by htong on 08/03/2016.
 */

whatsapp = whatsapp || {};
whatsapp.models = (function () {
    return {
        // Chat object
        chat : function chat(type, userIds, createdAt) {
            this.type = type;
            this.userIds = userIds;
            this.createdAt = createdAt;
        },
        // Message object
        message: function message(chatId, type, text, picture) {
            this.chatId = chatId;
            this.type = type;
            this.text = text;
            this.picture = picture;
        }
    };
})();