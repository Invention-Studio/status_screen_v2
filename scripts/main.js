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
  var QUEUE_INFO_3D_PRINTER = {title: "3D Printers",
                              color: "#b60000"};
  var QUEUE_INFO_DEFAULT = {title: "Default",
                              color: "#283941"};

  var App = window.App;
  var Clock = App.Clock;
  var Queue = App.Queue;
  var NewsTicker = App.NewsTicker;

  var mainClock = new Clock(SELECTOR_CLOCK_WEEKDAY, SELECTOR_CLOCK_DATE, SELECTOR_CLOCK_TIME);
  var mainNewsTicker = new NewsTicker(SELECTOR_NEWS_TICKER);
  var mainQueue = new Queue(SELECTOR_QUEUE_HEADER, SELECTOR_QUEUE_TITLE, SELECTOR_QUEUE_STATUS, SELECTOR_QUEUE_PANEL, SELECTOR_TEMPLATE_QUEUE_ENTRY);

  mainQueue.updateQueue(QUEUE_INFO_3D_PRINTER.color, QUEUE_INFO_3D_PRINTER.title, "1 Available", [{position: 1, userName: "George Burdell"}, {position: 2, userName: "Sally Mae"}]);
  setTimeout(function() {
    mainQueue.updateQueue(QUEUE_INFO_DEFAULT.color, QUEUE_INFO_DEFAULT.title, "1 Available", [{position: 1, userName: "George Burdell"}, {position: 2, userName: "Sally Mae"}]);
    setTimeout(function() {
      mainQueue.updateQueue(QUEUE_INFO_3D_PRINTER.color, QUEUE_INFO_3D_PRINTER.title, "1 Available", [{position: 1, userName: "George Burdell"}, {position: 2, userName: "Sally Mae"}]);
    }, 10000);
  }, 5000);


}) (window);
