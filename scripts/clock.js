(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function Clock(weekdaySelector, dateSelector, timeSelector) {
    //Ensure a proper selector for the "weekday" element is provided
    if (!weekdaySelector) {
        throw new Error('Missing selector');
    } else if (weekdaySelector.charAt(0) != '#') {
        throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the "weekday" element exists
    this.$weekdayElement = $(weekdaySelector);
    if (this.$weekdayElement.length === 0) {
      throw new Error('Could not find element with selector: ' + weekdaySelector);
    }
    
    //Ensure a proper selector for the "date" element is provided
    if (!dateSelector) {
        throw new Error('Missing selector');
    } else if (dateSelector.charAt(0) != '#') {
        throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the "date" element exists
    this.$dateElement = $(dateSelector);
    if (this.$dateElement.length === 0) {
      throw new Error('Could not find element with selector: ' + dateSelector);
    }


    //Ensure a proper selector for the "time" element is provided
    if (!timeSelector) {
        throw new Error('Missing selector');
    } else if (timeSelector.charAt(0) != '#') {
        throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the "time" element exists
    this.$timeElement = $(timeSelector);
    if (this.$timeElement.length === 0) {
      throw new Error('Could not find element with selector: ' + timeSelector);
    }

    //Set the element to update on its own
    update.call(this);
  };

  //Private function to update the clock display
  function update() {
    var clock = this; //Save the 'this' context, since it cannot be used in setInterval
    setInterval(function() { //Loop every 1 second
      var date = new Date();
      clock.$weekdayElement.text(date.toLocaleString('en-us', {  weekday: 'long' }));
      clock.$dateElement.text(date.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric'}));
      clock.$timeElement.text(date.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric'}));
    }, 1000);
  };

  App.Clock = Clock;
  window.App = App;

}) (window);
