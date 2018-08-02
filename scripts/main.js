(function (window) {
  'use strict';

  let SELECTOR_CLOCK_WEEKDAY = '#main-header-date-time-day';
  let SELECTOR_CLOCK_DATE = '#main-header-date-time-date';
  let SELECTOR_CLOCK_TIME = '#main-header-date-time-time';
  let SELECTOR_ON_DUTY_PANEL = '#main-on-duty';
  let SELECTOR_TEMPLATE_PI_CARD = '#template-pi-card';
  let SELECTOR_QUEUE_HEADER = '#main-queue-header';
  let SELECTOR_QUEUE_TITLE = '#queue-name';
  let SELECTOR_QUEUE_STATUS = '#queue-status';
  let SELECTOR_QUEUE_PANEL = '#main-queue';
  let SELECTOR_TEMPLATE_QUEUE_ENTRY = '#template-queue-entry';
  let SELECTOR_NEWS_TICKER = '#news-ticker';
  let COLOR_ON_DUTY_DEFAULT = "#283941";
  let COLOR_ON_DUTY_LATE = "#b60000";
  let QUEUE_INFO_DEFAULT = {title: "Default",
                            color: "#283941"};
  let QUEUE_INFO_3D_PRINTERS = {title: "3D Printers",
                              color: "#b60000"};
  let QUEUE_INFO_LASER_CUTTERS = {title: "Laser Cutters",
                              color: "#1c1c82"};
  let QUEUE_INFO_WATERJET = {title: "Waterjet",
                              color: "#1c1c82"};

  let App = window.App;
  let Clock = App.Clock;
  let InventionStudioApi = App.InventionStudioApi;
  let OnDuty = App.OnDuty;
  let Queue = App.Queue;
  let NewsTicker = App.NewsTicker;

  let mainClock = new Clock(SELECTOR_CLOCK_WEEKDAY, SELECTOR_CLOCK_DATE, SELECTOR_CLOCK_TIME);
  let mainNewsTicker = new NewsTicker(SELECTOR_NEWS_TICKER);
  let inventionStudioApi = new InventionStudioApi();
  let mainOnDuty = new OnDuty(SELECTOR_ON_DUTY_PANEL, SELECTOR_TEMPLATE_PI_CARD);
  let mainQueue = new Queue(SELECTOR_QUEUE_HEADER, SELECTOR_QUEUE_TITLE, SELECTOR_QUEUE_STATUS, SELECTOR_QUEUE_PANEL, SELECTOR_TEMPLATE_QUEUE_ENTRY);

  var currentQueue = QUEUE_INFO_DEFAULT;
  updateQueues();

  var onDutyEntries = [];
  updateOnDuty();

  window.setInterval(function() {
    updateQueues();
    updateOnDuty();
  }, 15000);

  function updateQueues() {
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

      let entryArray = $.parseJSON(response);

      let queueEntries = [];

      entryArray.forEach(function (entry) {
        if (entry.queueName == currentQueue.title) {
          queueEntries.push(entry);
        }
      });

      mainQueue.updateQueue(currentQueue.color, currentQueue.title, "0 Available", queueEntries);
    });
  };

  function updateOnDuty() {
    inventionStudioApi.getOnDuty(function(response) {
        let entries = $.parseJSON(response);
        entries.sort(function (a, b) { //Sort the entires by queue position
          return a.name - b.name;
        });
        if (!onDutyArraysMatch(entries, onDutyEntries)) {
          mainOnDuty.updateOnDuty(COLOR_ON_DUTY_DEFAULT, COLOR_ON_DUTY_LATE, entries);
        }
        onDutyEntries = entries;
    });
  };

}) (window);
