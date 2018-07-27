(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  var URL = 'https://www.humanity.com/api/v2/';
  var SHIFTS_REQUEST_ENDPOINT = 'shifts?access_token=';

  function HumanityApi() {
  }

  HumanityApi.prototype.getEmployeesOnShift = function(onComplete) {
    
  }

  App.HumanityApi = HumanityApi;
  window.App = App;

}) (window);
