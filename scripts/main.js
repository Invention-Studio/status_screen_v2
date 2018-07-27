(function (window) {
  'use strict';

  var SELECTOR_CLOCK_WEEKDAY = '#main-header-date-time-day';
  var SELECTOR_CLOCK_DATE = '#main-header-date-time-date';
  var SELECTOR_CLOCK_TIME = '#main-header-date-time-time';
  var SELECTOR_QUEUE = '#main-queue';
  var SELECTOR_TEMPLATE_QUEUE_ENTRY = '#template-queue-entry';
  var SELECTOR_NEWS_TICKER = '#news-ticker';

  var App = window.App;
  var Clock = App.Clock;
  var Queue = App.Queue;
  var NewsTicker = App.NewsTicker;

  var mainClock = new Clock(SELECTOR_CLOCK_WEEKDAY, SELECTOR_CLOCK_DATE, SELECTOR_CLOCK_TIME);
  var mainNewsTicker = new NewsTicker(SELECTOR_NEWS_TICKER);
  var mainQueue = new Queue(SELECTOR_QUEUE, SELECTOR_TEMPLATE_QUEUE_ENTRY);

  mainQueue.updateQueue([{position: 1, userName: "George Burdell"}, {position: 2, userName: "Sally Mae"}]);

}) (window);
