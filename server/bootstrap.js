
(function(){
    'use strict';

    Meteor.startup(function () {
        // Get list of all Method names on Lists
        const WHATSAPP_METHODS = _.pluck(whatsapp.methods, 'name');

        // Only allow 5 list operations per connection per second
        DDPRateLimiter.addRule({
            name(name) {
                return _.contains(WHATSAPP_METHODS, name);
            },
            // Rate limit per connection ID
            connectionId() { return true; }
        }, 5, 1000);
    });
})();
