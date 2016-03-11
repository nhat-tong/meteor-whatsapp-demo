/**
 * Created by htong on 06/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .run(KickStartApp);

    //@ngInject
    function KickStartApp($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            if(error === 'AUTH_REQUIRED') {
                $state.go('login');
            }
        });
    }
})();