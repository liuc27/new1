angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('types', function ($rootScope,$http,localStorageService) {
        var types,items,checked = [], i,theChecked = []

        $http.get("http://hahadz.com:3000/api/types").success(function (data) {
            console.log(data)
            localStorageService.set("typesData",data)
            types=data
        })
        $http.get("http://hahadz.com:3000/api/posts").success(function (data) {
            console.log(data)
            localStorageService.set("itemsData",data)
            items=data
            $rootScope.$broadcast('myService:getUserConfigSuccess');
            for(i=0;i<items.length;i++){
                items[i].id=i;
            }
        })


        return {
            all: function () {
                return types;
            },
            get: function (typeId) {
                return types[typeId];
            },
            fetch: function (couponId) {
                return items[couponId];
            },
            fetchFavorite: function (couponId) {
                return checked[couponId];
            },
            allItems: function () {
                return items;
            },
            favoriteList: function () {
                return checked;
            }
        }
    });