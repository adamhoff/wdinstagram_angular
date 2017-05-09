"use strict";

angular
  .module("Entry", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("EntryFactory", [
    "$resource",
    FactoryFunction
  ])
  .controller("EntryIndexController", [
    "EntryFactory",
    EntryIndexControllerFunction
  ])
  .controller("EntryShowController", [
    "EntryFactory",
    "$stateParams",
    EntryShowControllerFunction
  ])
  .controller("EntryNewController", [
    "EntryFactory",
    EntryNewControllerFunction
  ])
  .controller("EntryEditController", [
    "EntryFactory",
    "$stateParams",
    EntryEditControllerFunction
  ])

function FactoryFunction($resource) {
  return $resource("http://localhost:3000/entries/:id", {}, {
    update: {
      method: "PUT"
    }
  })
}

function RouterFunction($stateProvider) {
  $stateProvider
    .state("entryIndex", {
      url: "/entries",
      templateUrl: "js/ng-views/index.html",
      controller: "EntryIndexController",
      controllerAs: "vm"
    })
    .state("entryNew", {
      url: "/entries/new",
      templateUrl: "js/ng-views/new.html",
      controller: "EntryNewController",
      controllerAs: "vm"
    })
    .state("entryShow", {
      url: "/entries/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "EntryShowController",
      controllerAs: "vm"
    })
    .state("entryEdit", {
      url: "/enetries/:id/edit",
      templateUrl: "js/ng-views/edit.html",
      controller: "EntryEditController",
      controllerAs: "vm"
    })
}

function EntryIndexControllerFunction(EntryFactory) {
  this.entries = EntryFactory.query();
}

function EntryNewControllerFunction(EntryFactory, $stateParams) {
  this.entry = new EntryFactory();
  this.create = function() {
    this.entry.$save()
  }
}

function EntryEditControllerFunction(EntryFactory, $stateParams) {
  this.entry = EntryFactory.get({
    id: $stateParams.id
  })
  this.update = function() {
    this.entry.$update({
      id: $stateParams.id
    })
  }
  this.destroy = function() {
    this.entry.$delete({
      id: $stateParams.id
    })
  }
}

function EntryShowControllerFunction(EntryFactory, $stateParams) {
  this.entry = EntryFactory.get({
    id: $stateParams.id
  })
}
