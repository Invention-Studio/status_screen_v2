(function (window) {
  'use strict';

  var SELECTOR_CLOCK_WEEKDAY = '#main-header-date-time-day';
  var SELECTOR_CLOCK_DATE = '#main-header-date-time-date';
  var SELECTOR_CLOCK_TIME = '#main-header-date-time-time';
  var SELECTOR_QUEUE_HEADER = '#main-queue-header';
  var SELECTOR_QUEUE_TITLE = '#queue-name';
  var SELECTOR_QUEUE_STATUS = '#queue-status';
  var SELECTOR_QUEUE_PANEL = '#main-queue';
  var SELECTOR_TEMPLATE_QUEUE_ENTRY = '#template-queue-entry';
  var SELECTOR_NEWS_TICKER = '#news-ticker';
  var QUEUE_INFO_DEFAULT = {title: "Default",
                            color: "#283941"};
  var QUEUE_INFO_3D_PRINTERS = {title: "3D Printers",
                              color: "#b60000"};
  var QUEUE_INFO_LASER_CUTTERS = {title: "Laser Cutters",
                              color: "#283941"};
  var QUEUE_INFO_WATERJET = {title: "Waterjet",
                              color: "#283941"};

  var App = window.App;
  var Clock = App.Clock;
  var InventionStudioApi = App.InventionStudioApi;
  var Queue = App.Queue;
  var NewsTicker = App.NewsTicker;

  var mainClock = new Clock(SELECTOR_CLOCK_WEEKDAY, SELECTOR_CLOCK_DATE, SELECTOR_CLOCK_TIME);
  var mainNewsTicker = new NewsTicker(SELECTOR_NEWS_TICKER);
  var inventionStudioApi = new InventionStudioApi();
  var mainQueue = new Queue(SELECTOR_QUEUE_HEADER, SELECTOR_QUEUE_TITLE, SELECTOR_QUEUE_STATUS, SELECTOR_QUEUE_PANEL, SELECTOR_TEMPLATE_QUEUE_ENTRY);

  var currentQueue = QUEUE_INFO_DEFAULT;
  window.setInterval(function() {
    console.log("checkpoint");
    inventionStudioApi.getQueue(function(response) {
      switch (currentQueue.title) {
        case "3D Printers":
          currentQueue = QUEUE_INFO_LASER_CUTTERS;
          break;
        case "Laser Cutters":
          currentQueue = QUEUE_INFO_WATERJET;
          break;
        case "Waterjet":
          currentQueue = QUEUE_INFO_3D_PRINTERS;
          break;
        default:
          currentQueue = QUEUE_INFO_3D_PRINTERS;
      }

      var entryArray = $.parseJSON(response);

      var queueEntries = [];

      entryArray.forEach(function (entry) {
        if (entry.queueName == currentQueue) {
          queueEntries.push(entry);
        }
      });

      mainQueue.updateQueue(currentQueue.color, currentQueue.title, "0 Available", queueEntries);
    });
  }, 10000);

}) (window);
