angular.module('starter.filters', [])
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });
 /**
 * Created by chao liu on 2014/11/23.
 */
