angular.module('app').controller('RoleController', [
  '$scope',
  function ($scope) {
    var me = this;
    $.getJSON('config.json', function (data) {
      me.data = data;
      $scope.$apply();
    });

    $.getJSON('scenarios.json', function (data) {
      me.locations = _.map(data, 'location');
      $scope.$apply();
    });
  }
]);
