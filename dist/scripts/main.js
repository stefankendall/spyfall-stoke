"use strict";angular.module("app",[]),angular.module("app").controller("RoleController",["$scope",function(o){var a=this;$.getJSON("config.json",function(l){a.data=l,o.$apply()})}]);