"use strict";




angular
  .module("Entry", [
    "ui.router"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("EntryIndexController", [
    EntryIndexControllerFunction
  ])
  .controller("EntryShowController", [
    "$stateParams",
    EntryShowControllerFunction
  ]);

function RouterFunction($stateProvider) {
  $stateProvider
    .state("entryIndex", {
      url: "/entries",
      templateUrl: "js/ng-views/index.html",
      controller: "EntryIndexController",
      controllerAs: "vm"
    })
    .state("entryShow", {
      url: "/entries/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "EntryShowController",
      controllerAs: "vm"
    })
}

function EntryIndexControllerFunction() {
  this.entries = entries;
}

function EntryShowControllerFunction($stateParams) {
  this.entry = entries[$stateParams.id];
}
