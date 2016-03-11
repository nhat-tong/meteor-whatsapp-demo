/**
 * Created by htong on 29/02/2016.
 */
(function() {

    'use strict';

    console.log('3. AngularConfig is initializing');

    angular
        .module('Whatsapp')
        .config(AppConfig);

    //@ngInject
    function AppConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'client/app/signup/signup.html',
                controller: 'SignUpCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'client/app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('confirmation', {
                url: '/confirmation',
                templateUrl: 'client/app/confirmation/confirmation.html',
                params: { phone: null, password: null },
                controller: 'ConfirmationCtrl',
                controllerAs: 'vm'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'client/app/profile/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm',
                resolve: {
                    user: isAuthorized
                }
            })
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'client/app/tabs/tabs.html',
                resolve: {
                    user: isAuthorized
                }
            })
            .state('tab.favorites', {
                url: '/favorites',
                views: {
                    'tab-favorites': {
                        templateUrl: 'client/app/favorites/favorites.html'
                    }
                }
            })
            .state('tab.recents', {
                url: '/recents',
                views: {
                    'tab-recents': {
                        templateUrl: 'client/app/recents/recents.html'
                    }
                }
            })
            .state('tab.contacts', {
                url: '/contacts',
                views: {
                    'tab-contacts': {
                        templateUrl: 'client/app/contacts/contacts.html'
                    }
                }
            })
            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        controller: 'ChatsCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'client/app/chats/chats.html'
                    }
                }
            })
            .state('tab.chat', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        controller: 'ChatCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'client/app/chats/chat.html',
                        resolve: {
                            //@ngInject
                            chat: function ($stateParams) {
                                let chatId = $stateParams.chatId;
                                return whatsapp.collections.chats.findOne(chatId);
                            }
                        }
                    }
                }
            })
            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        controller: 'SettingsCtrl',
                        controllerAs: 'vm',
                        templateUrl: 'client/app/settings/settings.html'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/chats');
    }

    //@ngInject
    function isAuthorized($q) {
        let deferred = $q.defer();

        if(_.isEmpty(Meteor.user())) {
             deferred.reject('AUTH_REQUIRED');
        }
        else {
            deferred.resolve();
        }

        return deferred.promise;
    }
    console.log('4. AngularConfig is initialized');
})();