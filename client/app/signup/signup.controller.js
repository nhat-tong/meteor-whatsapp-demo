/**
 * Created by htong on 08/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .controller('SignUpCtrl', SignUpController);

    //@ngInject
    function SignUpController($scope, $state, $reactive, $ionicPopup, $ionicLoading, $log) {
        var vm = this;
        $reactive(this).attach($scope);

        vm.phone = '';
        vm.password = '';
        vm.signUp = signUp;

        function signUp() {
            if(_.isEmpty(vm.phone) || _.isEmpty(vm.password)) return;

            //1. ask user to confirm phone number
            let confirmPopup = $ionicPopup.confirm({
                title: 'Number confirmation',
                template: '<div>' + vm.phone + '</div><div>Is your phone number above correct?</div>',
                cssClass: 'text-center',
                okText: 'Yes',
                okType: 'button-positive button-clear',
                cancelText: 'edit',
                cancelType: 'button-dark button-clear'
            });

            confirmPopup.then((res) => {
                if(!res) return;

                //2. run Account's API to send sms
                $ionicLoading.show({
                    template: 'Sending verification code...'
                });

                Accounts.requestPhoneVerification(vm.phone, (err,res) => {
                    $ionicLoading.hide();
                    if(err) {
                        return handleError(err);
                    }

                    $state.go('confirmation', { phone: vm.phone, password: vm.password });
                });
            });
        }

        function handleError(err) {
            $log.error('Login error ', err);

            $ionicPopup.alert({
                title: err.reason || 'Login failed',
                template: 'Please try again',
                okType: 'button-positive button-clear'
            });
        }
    }
})();