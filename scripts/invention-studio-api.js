(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  var URL = 'https://is-apps.me.gatech.edu/api/v1-0/';
  var QUEUE_REQUEST_ENDPOINT = 'server/queues';

  function InventionStudioApi() {
  }

  InventionStudioApi.prototype.getQueue = function(onComplete) {
    var requestUrl = URL + QUEUE_REQUEST_ENDPOINT;
    return $.get(requestUrl, function (serverResponse) {
      if (onComplete) {
        onComplete(serverResponse);
      }
    });
  }

  App.InventionStudioApi = InventionStudioApi;
  window.App = App;

}) (window);
