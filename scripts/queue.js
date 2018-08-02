(function (window) {
  'use strict';

  let App = window.App || {};
  let $ = window.jQuery;

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
    let headerBackgroundColor = queueColor;
    let panelBackgroundColor = lightenColor(queueColor, 95);
    let elementBackgroundColor = lightenColor(queueColor, 80);
    let elementBorderColor = queueColor;

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
    let queue = this; //Save the 'this' context, since it cannot be used in the promise function
    //Find, fade out, and remove all of the existing queue entry elements
    this.$queuePanel.find('.queue-entry').fadeOut().promise().done(function() {
      //Remove the existing queue entry elements
      this.unmount();

      //Then add the new elements
      if (queueEntries.length > 0) { //If there are entries, create and display an element for each
        queueEntries.sort(function (a, b) { //Sort the entires by queue position
          return a.position - b.position;
        });
        queueEntries.forEach(function(entry) { //Create and display an element
          //Create a new Entry and get the DOM element
          let newEntry = new Entry(queue.$elementTemplateSelector, entry).$element;
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
        let emptyEntry = new Entry(queue.$elementTemplateSelector, {message: "No Queue"}).$element;
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
    let elementDiv = $($(templateSelector).html());

    //Get the title label within the element
    let titleContent = $(elementDiv).find('.queue-entry-title-content');

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

  App.Queue = Queue;
  window.App = App;

}) (window);
