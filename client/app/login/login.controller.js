/**
 * Created by htong on 06/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .controller('LoginCtrl', LoginController);

    //@ngInject
    function LoginController($scope, $state, $reactive, $log) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.phone = '';
        vm.password = '';
        vm.login = login;

        activate();

        function activate() {
            vm.helpers({
                errors: () => {
                    return [];
                }
            });
        }

        function login() {
            if(_.isEmpty(vm.phone) || _.isEmpty(vm.password)) return;

            Meteor.loginWithPhoneAndPassword({phone: vm.phone}, vm.password, (err,res)=> {
                if(err) {
                    return handleError(err);
                }
                $state.go('tab.chats');
            });
        }

        function handleError(err) {
            vm.errors.push(err.reason);
        }
    }
})();