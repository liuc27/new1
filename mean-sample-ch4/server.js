<!doctype html>
<html lang="en">
<link rel="stylesheet" type="text/css" href="css/test.css">

<head>
  <meta charset="UTF-8">
  <title>Example - example-input-directive-production</title>
</head>

<body ng-app="inputExample">
  <div ng-controller="ExampleController">
    <form name="myForm">


      真名(产品名相同):
      <input type="text" ng-model="user.name">
      <br>类别(shopping,beauty,food,entertainment):
      <input type="text" ng-model="user.category">
      <br>数量:
      <input type="number" ng-model="user.numbers">
      <br>产品名:
      <input type="text" ng-model="user.productName">
      <br>产品简介:
      <input type="text" ng-model="user.productIntroduction">
      <br>产品详细:
      <input type="text" ng-model="user.productDetail">
      <br>到期日期:
      <input type="text" ng-model="year">年
      <input type="text" ng-model="month">月
      <input type="text" ng-model="day">日

      <br>图片:
      <input ng-change="abc()" type='file' ng-model='image' base-sixty-four-input>



    </form>
    <hr>

    <button ng-click="sendJson()">添加</button>
    </br>
    </br>
    </br>
    </br>
    <button ng-click="replace()">替换</button>
    </br>
    </br>
    <tt id="jsonDiv">{{user}}</tt>
    <br/>
  </div>
</body>
<script src="js/angular.js"></script>
<script src="js/angular-base64-upload.js"></script>
<script>
  angular.module('inputExample', ['naif.base64'])
    .controller('ExampleController', function ($scope, $http) {
      $scope.user = {};
      $scope.image = {};
      //$scope.user.productName = new Date('2015', '02', '16', '12', '33');

      //var m = $scope.user.productName;
      //console.log(m.getTime());
      //var k = new Date();
      //console.log(k.getTime());
      $scope.abc = function () {
        $scope.user.image = "data:" + $scope.image.filetype + ";base64," + $scope.image.base64;
        console.log($scope.user)
      }

      $scope.sendJson = function () {
        $scope.user.timeLimit = new Date($scope.year, $scope.month - 1, $scope.day, '23', '59', '59');
        $http.post("http://localhost:3000/api/posts", $scope.user).success(function (data) {
          console.log(data)
          alert("successfully pushed")
        })
      }

      $scope.replace = function () {
        $scope.user.timeLimit = new Date($scope.year, $scope.month - 1, $scope.day, '23', '59', '59');
        $http.post("http://localhost:3000/api/replace", $scope.user).success(function (data) {
          console.log(data)
          if (data = "OK")
            alert("successfully replaced")
        })
      }
    });
</script>

</html>
