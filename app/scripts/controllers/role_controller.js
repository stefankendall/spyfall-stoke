angular.module('app').controller('RoleController', [
  '$scope',
  function ($scope) {
    var me = this;
    this.started = false;
    this.numberOfPlayers = 12;
    this.seed = 1023;
    this.spyPlayerIndex1 = -1;
    this.spyPlayerIndex2 = -1;

    $.getJSON('scenarios.json', function (scenarios) {
      me.scenarios = scenarios;
      me.locations = _.map(scenarios, 'location');
      $scope.$apply();
    });

    var buildPlayers = function () {
      var players = [];
      for (var i = 0; i < me.numberOfPlayers; i++) {
        if (i === me.spyPlayerIndex1 || i === me.spyPlayerIndex2) {
          players.push({role: 'Spy', location: null});
        }
        else {
          var role = me.scenario.roles[(i + me.playerRoleOffset) % me.scenario.roles.length];
          players.push({role: role, location: me.scenario.location});
        }
      }
      return players;
    };

    this.start = function () {
      me.started = true;
      var rng = new RNG(me.seed);
      var scenarioIndex = Math.floor(rng.nextFloat() * (me.locations.length - 1));
      me.scenario = me.scenarios[scenarioIndex];
      me.playerRoleOffset = Math.floor(rng.nextFloat() * (me.scenario.roles.length - 1));
      me.spyPlayerIndex1 = Math.floor(rng.nextFloat() * (me.numberOfPlayers - 1));
      if (me.numberOfPlayers >= 9) {
        me.spyPlayerIndex2 = Math.floor(rng.nextFloat() * (me.numberOfPlayers - 1));
        while (me.spyPlayerIndex2 === me.spyPlayerIndex1) {
          me.spyPlayerIndex2 = Math.floor(rng.nextFloat() * (me.numberOfPlayers - 1));
        }
      }
      me.players = buildPlayers();
    };

    this.resetScroll = function () {
      window.scrollTo(0, 0);
    };
  }
]);
