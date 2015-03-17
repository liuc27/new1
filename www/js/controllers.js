angular.module('starter.controllers', [])

.controller('CouponCtrl', function ($scope, localStorageService, types) {
  $scope.items = types.allItems();

})

.controller('typesCtrl', function ($scope, types) {
  $scope.types = types.all();
})

.controller('typeDetailCtrl', function ($scope, $stateParams, types) {
  $scope.type = types.get($stateParams.typeId);
  $scope.checked = types.favoriteList();

})

.controller('CouponDetailCtrl', function ($scope, $stateParams, localStorageService, $ionicPopup, types, $http) {

  $scope.types = types.all();
  $scope.items = types.allItems();
  $scope.checked = types.favoriteList();
  console.log("stateParams are");
  console.log($stateParams);
  console.log($scope.checked);
  console.log($scope.items)
  $scope.coupon = types.fetch($stateParams.couponId);
  $scope.favorites = "button icon-left ion-plus button-positive";
  $scope.favoritesText = "点击领取";

  $scope.clicked = false;
  var exist;
  console.log($scope.checked);
  if (localStorageService.get("checkedData")) {
    $scope.checked = localStorageService.get("checkedData")
  }
  $scope.favoriteClass = function () {
    angular.forEach($scope.checked, function (value) {
      if (value.name == $scope.coupon.name && value.category == $scope.coupon.category && value.productIntroduction == $scope.coupon.productIntroduction && value.productName == $scope.coupon.productName) {
        exist = true;
      }
    });
    if (exist) {
      $scope.favorites = "button icon-left ion-heart button-positive";
      $scope.favoritesText = "已经领取";
    }
  };
  $scope.changeClass = function () {
    var couponName = $scope.coupon.name
    if ($scope.favoritesText === "点击领取" && $scope.clicked == false) {
      var notExist = true;
      $scope.clicked = true;
      angular.forEach($scope.checked, function (value) {
        if (value.name == $scope.coupon.name && value.category == $scope.coupon.category && value.category == $scope.coupon.category && value.productIntroduction == $scope.coupon.productIntroduction && value.productName == $scope.coupon.productName) {
          notExist = false;
        }
      });
      if (notExist) {
        $http.post("http://120.24.168.7:3000/api/add", {
          "name": couponName
        }).success(function (data) {
          if (data === "couldn't find") {
            $ionicPopup.alert({
              title: '非常抱歉,库存不足'
            });
            $scope.favoritesText = "无法领取";
          } else {

            $ionicPopup.alert({
              title: '恭喜,成功领取!'
            });
            $scope.favoritesText = "已经领取";
            $scope.favorites = "button icon-left ion-heart button-positive";
            $scope.items[$scope.coupon.id].numbers--
            var newCoupon = angular.copy($scope.coupon);
            console.log(newCoupon)
            pushSet($scope.checked.push(newCoupon));
          }
        });

        //delete $scope.items[$scope.coupon.id];
        console.log($scope.items);

        function pushSet(x) {
          console.log(x)
          localStorageService.set("checkedData", $scope.checked);

        }
        console.log("this is" + $scope.checked)
      }
      var newChecked = angular.copy($scope.checked);
      $scope.checked = newChecked;
      console.log(newChecked)
    }

  }

})

.controller('favoriteListCtrl', function ($scope, $stateParams, localStorageService, types) {
  //localStorageService.clearAll()
  $scope.types = types.all();
  $scope.items = types.allItems();
  $scope.coupon = types.fetch($stateParams.couponId);
  $scope.favorites = "button icon-left ion-plus button-positive";
  $scope.favoritesText = "点击领取";

  if (localStorageService.get("checkedData")) {
    $scope.checked = localStorageService.get("checkedData")
  }



})

.controller('favoriteDetailCtrl', function ($scope, $stateParams, localStorageService, types, $http) {
  console.log(parseInt($stateParams.favoriteId))
  if (localStorageService.get("checkedData")) {
    $scope.checked = localStorageService.get("checkedData")
  }
  console.log($scope.checked)
  $scope.items = types.allItems();
  angular.forEach($scope.checked, function (value) {
    if (value.id == $stateParams.favoriteId) {
      $scope.favoriteCoupon = value;
      console.log(value)
    }
  });
  //$scope.favoriteCoupon = $scope.checked[parseInt($stateParams.favoriteId)];
  console.log("favoriteCoupon is")
  console.log($stateParams)
  $scope.checked = types.favoriteList();
  $scope.favorites = "button icon-left ion-plus button-positive";
  $scope.favoritesText = "点击领取";
  $scope.changeClass = function () {
    if ($scope.favorites === "button icon-left ion-plus button-positive") {
      $scope.favorites = "button icon-left ion-heart button-positive";
      if ($scope.favoritesText === "点击领取")
        $scope.favoritesText = "已经领取";
    }
  };


})
  .controller('MenuCtrl', function ($scope, types, $http, $ionicSideMenuDelegate, localStorageService, $location) {
    $scope.register = function (username, password) {
      $http.post("http://120.24.168.7:3000/api/user", {
        "username": username,
        "password": password
      }).success(function (data) {
        if (data === "already registered") {
          alert("用户名已经注册，请换用户名！");
        } else {
          alert("注册成功！");
          $location.path('#/tab/coupon');
          localStorageService.set("usernameDate", data);


        }
      });
    };
  })
  .controller('MyCtrl', function ($rootScope, $scope, types, $http, localStorageService, $state) {
    $scope.doRefresh = function () {

      $http.get("http://120.24.168.7:3000/api/posts").success(function (data) {
        console.log(data)
        $scope.items = data;
        $rootScope.items = data;
        localStorageService.set("itemsData", data)
      })
        .finally(function () {
          $scope.$broadcast('scroll.refreshComplete')
        });
      /*
            reloadBroad($state.reload())
            function reloadBroad() {
                $scope.$broadcast('scroll.refreshComplete')
            }
            */
    }


    $scope.$on('myService:getUserConfigSuccess', function () {
      $scope.currentTime = new Date();
      $scope.items = types.allItems();
      if (localStorageService.get("checkedData")) {
        $scope.checked = localStorageService.get("checkedData")
      }
    });
    if (localStorageService.get("checkedData")) {
      $scope.checked = localStorageService.get("checkedData")
    }
    console.log($scope.checked)
    $scope.find = function (x) {
      var y = false
      angular.forEach($scope.checked, function (value) {
        if (value.name == x.name && value.category == x.category && value.productIntroduction == x.productIntroduction && value.productName == x.productName) {
          console.log("true")
          y = true
        }
      });
      return y;
    }

    $scope.currentTime = new Date();
    $scope.items = types.allItems();

  });
