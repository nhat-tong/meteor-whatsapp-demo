/**
 * Created by htong on 07/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .controller('SettingsCtrl', SettingsController);

    //@ngInject
    function SettingsController($scope, $reactive, $state) {
        var vm = this;
        $reactive(this).attach($scope);

        vm.logout = logout;

        function logout() {
            Meteor.logout((err) => {
                if(!err) {
                    $state.go('login');
                }
            });
        }
    }
})();