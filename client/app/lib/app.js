/**
 * Created by htong on 29/02/2016.
 */

(function(){

    'use strict';

    console.log('1. Angular module is initializing');

    // AngularJS module initialization
    angular
        .module('Whatsapp', ['angular-meteor', 'ionic', 'angularMoment']);

    // check for the current platform (browser or mobile)
    if(Meteor.isCordova) {
        // bootstrap angular when device has been initialized
        angular.element(document).on('deviceready', onReady);
    }else {
        // bootstrap angular when DOM has been loaded
        angular.element(document).ready(onReady);
    }

    // bootstrap angular module
    function onReady() {
        angular.bootstrap(document, ['Whatsapp']);
    }

    console.log('2. Angular module is initialized');
})();
