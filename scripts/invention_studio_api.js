(function (window) {
  'use strict';

  let App = window.App || {};
  let $ = window.jQuery;

  let BASE_URL = 'https://is-apps.me.gatech.edu/api/v1-0/';
  let QUEUE_REQUEST_ENDPOINT = 'status/queues';
  let ON_DUTY_REQUEST_ENDPOINT = 'status/on_duty';

  function InventionStudioApi() {
  }

  InventionStudioApi.prototype.getQueue = function(onComplete) {
    let requestUrl = BASE_URL + QUEUE_REQUEST_ENDPOINT;
    return $.get(requestUrl, function (serverResponse) {
      if (onComplete) {
        onComplete(serverResponse);
      }
    });
  };

  InventionStudioApi.prototype.getOnDuty = function(onComplete) {
    let requestUrl = BASE_URL + ON_DUTY_REQUEST_ENDPOINT;
    return $.get(requestUrl, function (serverResponse) {
      if (onComplete) {
        onComplete(serverResponse);
      }
    });
  };

  App.InventionStudioApi = InventionStudioApi;
  window.App = App;

}) (window);
