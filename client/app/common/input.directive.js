/**
 * Created by htong on 03/03/2016.
 */

(function(){
    'use strict';

    angular
    .module('Whatsapp')
    .directive('input', CustomInputDirective);

    //@ngInject
    function CustomInputDirective($timeout) {
        return {
            restrict: 'E',
            scope: {
                'returnClose': '=',
                'onReturn': '&',
                'onFocus': '&',
                'onBlur': '&'
            },
            link: linkFunc
        };

        function linkFunc(scope, element, attrs) {
            element.bind('focus', function (e) {
                if (!scope.onFocus) return;

                $timeout(function () {
                    scope.onFocus();
                });
            });

            element.bind('blur', function (e) {
                if (!scope.onBlur) return;

                $timeout(function () {
                    scope.onBlur();
                });
            });

            element.bind('keydown', function (e) {
                if (e.which != 13) return;

                if (scope.returnClose) {
                    element[0].blur();
                }

                if (scope.onReturn) {
                    $timeout(function () {
                        scope.onReturn();
                    });
                }
            });
        }
    }
})();