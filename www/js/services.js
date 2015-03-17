angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('types', function ($rootScope, $http, localStorageService) {
  var types, items = new Array();
  var checked = new Array();
  var i, theChecked = new Array();
  //localStorageService.clearAll();
  $http.get("http://120.24.168.7:3000/api/types").success(function (data) {
    console.log(data)
    localStorageService.set("typesData", data)
    types = data;
  })
  $http.get("http://120.24.168.7:3000/api/posts").success(function (data) {
    console.log(data.length)
    if (localStorageService.get("checkedData")) {
      checked = localStorageService.get("checkedData")
    }
    for (var i = 0; i < data.length; i++) {
      var x = data[i];
      console.log(x.name)
      console.log(checked)
      console.log(theChecked)

      angular.forEach(checked, function (value) {
        if (value.name == x.name && value.category == x.category && value.productIntroduction == x.productIntroduction && value.productName == x.productName) {
          console.log("true")
          var z = true;
          angular.forEach(theChecked, function (existence) {
            if (existence.name == x.name) {
              z = false;
            }
          });
          if (z == true) {
            theChecked.push(x)
            //console.log(theChecked)
          }
        }
        localStorageService.set("checkedData", theChecked)

        //console.log(theChecked)
        //console.log(localStorageService.get("checkedData"))
      });
    }

    localStorageService.set("itemsData", data)


    items = data
    $rootScope.$broadcast('myService:getUserConfigSuccess');
    for (i = 0; i < items.length; i++) {
      items[i].id = i;
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
