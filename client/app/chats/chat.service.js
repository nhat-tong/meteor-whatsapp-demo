/**
 * Created by htong on 07/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .factory('ChatSvc', ChatService);

    //@ngInject
    function ChatService($rootScope, $ionicModal) {
        var _this = this;
        let templateUrl = 'client/app/chats/chatmodal.html';

        return {
            showModal: showModal,
            hideModal: hideModal
        }

        function showModal() {
            $ionicModal.fromTemplateUrl(templateUrl).then(function(modal){
                _this.modal = modal;
                modal.show();
            });
        }

        function hideModal() {
            _this.modal.remove();
        }
    }
})();