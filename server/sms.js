/**
 * Created by htong on 06/03/2016.
 */

(function(){
    'use strict';

    // Add in order to use with a real twilio account
    SMS.twilio = {
        ACCOUNT_SID: Meteor.settings.TWILIO.SID,
        AUTH_TOKEN: Meteor.settings.TWILIO.TOKEN
    };

    SMS.phoneTemplates = {
        from: Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS,
        text: function (user, code) {
            return 'Welcome your invitation code is: ' + code;
        }
    };

// Account-Phone settings
    if (Meteor.settings && Meteor.settings.ACCOUNTS_PHONE) {
        Accounts._options.adminPhoneNumbers = Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
        Accounts._options.phoneVerificationMasterCode = Meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;
        Accounts._options.verificationMaxRetries = Meteor.settings.ACCOUNTS_PHONE.MAX_RETRIES;
    }
})();
