/**
 * Created by htong on 06/03/2016.
 */

(function(){
    'use strict';

    angular
        .module('Whatsapp')
        .controller('ConfirmationCtrl', ConfirmationController);

    //@ngInject
    function ConfirmationController($scope, $reactive, $state, $log, $ionicPopup) {
        var vm = this;
        $reactive(this).attach($scope);

        vm.code = '';
        vm.confirm = confirm;

        activate();

        function activate() {
            vm.phone = $state.params.phone;
        }

        function confirm() {
            if(_.isEmpty(vm.code)) return;

            let password = $state.params.password;
            Accounts.verifyPhone(vm.phone, vm.code, password, function(err,res){
                if(err) return handleError(err);
                $state.go('profile');
            });
        }

        function handleError(err) {
            $log.error('Verfication error ', err);

            $ionicPopup.alert({
                title: err.reason || 'Verfication failed',
                template: 'Please try again',
                okType: 'button-positive button-clear'
            });
        }
    }
})();