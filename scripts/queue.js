(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function Queue(queueHeaderSelector, queueTitleSelector, queueStatusSelector, queuePanelSelector, elementTemplateSelector) {
    //Ensure a proper selector for the queue header element is provided
    if (!queueHeaderSelector) {
        throw new Error('No selector provided');
    } else if (queueHeaderSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the queue header element exists
    this.$queueHeader = $(queueHeaderSelector);
    if (this.$queueHeader.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    //Ensure a proper selector for the queue title element is provided
    if (!queueTitleSelector) {
        throw new Error('No selector provided');
    } else if (queueTitleSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the queue title element exists
    this.$queueTitle = $(queueTitleSelector);
    if (this.$queueTitle.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    //Ensure a proper selector for the queue status element is provided
    if (!queueStatusSelector) {
        throw new Error('No selector provided');
    } else if (queueStatusSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the queue status element exists
    this.$queueStatus = $(queueStatusSelector);
    if (this.$queueStatus.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    //Ensure a proper selector for the queue panel element is provided
    if (!queuePanelSelector) {
        throw new Error('No selector provided');
    } else if (queuePanelSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the queue panel element exists
    this.$queuePanel = $(queuePanelSelector);
    if (this.$queuePanel.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    //Ensure a proper selector for the queue element template is provided
    if (!elementTemplateSelector) {
        throw new Error('No selector provided');
    } else if (elementTemplateSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the queue element template exists
    if ($(elementTemplateSelector).length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    //Store the queue element template selector for later
    this.$elementTemplateSelector = elementTemplateSelector;
  };

  //Display a new queue
  Queue.prototype.updateQueue = function(queueColor, queueTitle, queueStatus, queueEntries) {
    var headerBackgroundColor = queueColor;
    var panelBackgroundColor = lightenColor(queueColor, 95);
    var elementBackgroundColor = lightenColor(queueColor, 80);
    var elementBorderColor = queueColor;

    //Fade in the new header background color
    //The fade effect comes from the transition property in queue_panel.css
    this.$queueHeader.css({
      "background-color": headerBackgroundColor
    });

    //Fade in the new panel background color
    //The fade effect comes from the transition property in queue_panel.css
    this.$queuePanel.css({
      "background-color": panelBackgroundColor
    });

    //Fade in the new queue title
    this.$queueTitle.fadeOut(function() {
      $(this).text(queueTitle).fadeIn();
    });

    //Fade in the new queue status
    this.updateQueueStatus(queueStatus);

    //Fade in the new queue queue entries
    this.updateQueueEntries(queueEntries, elementBackgroundColor, elementBorderColor);
  };

  //Update the current queue status
  Queue.prototype.updateQueueStatus = function(queueStatus) {
    //Fade in the new queue status
    this.$queueStatus.fadeOut(function() {
      $(this).text(queueStatus).fadeIn();
    });
  }

  //Update the current queue entries
  Queue.prototype.updateQueueEntries = function(queueEntries, backgroundColor = null, borderColor = null) {
    var queue = this; //Save the 'this' context, since it cannot be used in the promise function
    //Find, fade out, and remove all of the existing queue entry elements
    this.$queuePanel.find('.queue-entry').fadeOut().promise().done(function() {
      //Remove the existing queue entry elements
      this.remove();

      //Then add the new elements
      if (queueEntries.length > 0) { //If there are entries, create and display an element for each
        queueEntries.sort(function (a, b) { //Sort the entires by queue position
          return a.position - b.position;
        });
        queueEntries.forEach(function(entry) { //Create and display an element
          //Create a new Entry and get the DOM element
          var newEntry = new Entry(queue.$elementTemplateSelector, entry).$element;
          if (backgroundColor && borderColor) {
            newEntry.css({
              "background-color": backgroundColor,
              "border-color": borderColor
            });
          }
          $(newEntry).hide(); //Hide the element
          queue.$queuePanel.append(newEntry); //Add the element to the page
          $(newEntry).fadeIn(); //Fade the element in
        });
      } else { //If there are no elements, create and display an element showing the queue is empty
        //Create a new Entry that says "No Queue" and get the DOM element
        var emptyEntry = new Entry(queue.$elementTemplateSelector, {message: "No Queue"}).$element;
        if (backgroundColor && borderColor) {
          emptyEntry.css({
            "background-color": backgroundColor,
            "border-color": borderColor
          });
        }
        $(emptyEntry).hide(); //Hide the element
        queue.$queuePanel.append(emptyEntry); //Add the element to the page
        $(emptyEntry).fadeIn(); //Fade the element in
      }
    });
  }

  function Entry(templateSelector, queueEntry) {
    //Get the template's inner HTML, then create an element from it
    //The syntax here is very picky. Other methods of creating elements
    //from templates can result in "Document Fragments" which cannot hide or fade in
    var elementDiv = $($(templateSelector).html());

    //Get the title label within the element
    var titleContent = $(elementDiv).find('.queue-entry-title-content');

    //Ensure the title label element exists
    if (titleContent.length === 0) {
      throw new Error('Could not find titleContent element');
    }

    //Create the title lable text
    var description = "";
    //If the entry being created is for a user, add their queue position (number) and their name
    if (queueEntry.position) {
      description = queueEntry.position + ". " + queueEntry.userName;
    } else { //If not, the queue is entry, so add the provided "No Queue" mssage
      description = queueEntry.message;
    }
    //Add the text into the title label element
    titleContent.append(description);

    //Set this $element property to the newly created element
    //$element will be accessed by the caller
    this.$element = elementDiv;
  };

  //Much of the logic in this function is copied from https://gist.github.com/mjackson/5311256
  function lightenColor(hexColor, lightness) {
    //Hex to RGB
    var r = parseInt(hexColor.slice(1, 3), 16);
    var g = parseInt(hexColor.slice(3, 5), 16);
    var b = parseInt(hexColor.slice(5, 7), 16);

    //RGB to HSL
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    //Manually change the lightness
    l = lightness / 100.0;

    //HSL to RGB
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3) * 255;
      g = hue2rgb(p, q, h) * 255;
      b = hue2rgb(p, q, h - 1/3) * 255;
    }

      var rgb = (r << 16) | (g << 8) | b;
      return '#' + (0x1000000 + rgb).toString(16).slice(1)
    }

  App.Queue = Queue;
  window.App = App;

}) (window);
