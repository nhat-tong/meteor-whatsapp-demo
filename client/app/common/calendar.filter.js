/**
 * Created by htong on 01/03/2016.
 */

(function () {
    'use strict';

    angular
        .module('Whatsapp')
        .filter('calendar', CalendarFilter);

    //@ngInject
    function CalendarFilter() {
        return function (time) {
            if (!time) return;

            return moment(time).calendar(null, {
                lastDay : '[Yesterday]',
                sameDay : 'LT',
                lastWeek : 'dddd',
                sameElse : 'DD/MM/YY'
            });
        }
    }
})();