angular.module('app').controller('RoleController', [
  '$scope',
  function ($scope) {
    var me = this;
    $.getJSON("config.json", function (data) {
      me.data = data;
      $scope.$apply();
    });
  }
]);
