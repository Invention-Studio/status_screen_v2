(function (window) {
  'use strict';

  let App = window.App || {};
  let $ = window.jQuery;

  let DEFAULT_IMAGE_URL = "img/empty_avatar.png";
  let EMPTY_ENTRY = {name: "Nobody On Duty", photoUrl: DEFAULT_IMAGE_URL, late: false};

  function OnDuty(onDutyPanelSelector, elementTemplateSelector) {
    //Ensure a proper selector for the On Duty Panel element is provided
    if (!onDutyPanelSelector) {
        throw new Error('No selector provided');
    } else if (onDutyPanelSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Ensure the On Duty Panel header element exists
    this.$onDutyPanel = $(onDutyPanelSelector);
    if (this.$onDutyPanel.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    //Store the On Duty Panel element template selector for later
    this.$elementTemplateSelector = elementTemplateSelector;
  };

  //Display a new On Duty Panel
  OnDuty.prototype.updateOnDuty = function(onDutyColor, lateColor, onDutyEntries) {
    let borderColor = onDutyColor;
    let onDutyBackgroundColor = lightenColor(onDutyColor, 70);
    let lateBackgroundColor = lightenColor(lateColor, 80);

    //Fade in the new PI cards
    let self = this; //Save the 'this' context, since it cannot be used in the promise function
    //Find, fade out, and remove all of the existing PI cards elements
    this.$onDutyPanel.find('.pi-card').fadeOut().promise().done(function() {
      //Remove the existing PI card elements
      this.remove();

      //Then add the new elements
      if (onDutyEntries.length > 0) { //If there are entries, create and display an element for each
        onDutyEntries.forEach(function(entry) { //Create and display an element
          if (entry.photoUrl == null) {
            entry.photoUrl = DEFAULT_IMAGE_URL;
          }
          //Create a new Entry and get the DOM element
          var backgroundColor = onDutyBackgroundColor;
          if (entry.late) {
            backgroundColor = lateBackgroundColor;
          }
          let newEntry = new Entry(self.$elementTemplateSelector, borderColor, backgroundColor, entry).$element;
          $(newEntry).hide(); //Hide the element
          self.$onDutyPanel.append(newEntry); //Add the element to the page
          $(newEntry).fadeIn(); //Fade the element in
        });
      } else { //If there are no elements, create and display an element showing that nobody is on duty
        //Create a new Entry that says "Nobody is on duty" and get the DOM element
        let entry = EMPTY_ENTRY;
        let emptyEntry = new Entry(self.$elementTemplateSelector, borderColor, lateBackgroundColor, entry).$element;
        $(emptyEntry).hide(); //Hide the element
        self.$onDutyPanel.append(emptyEntry); //Add the element to the page
        $(emptyEntry).fadeIn(); //Fade the element in
      }
    });
  };

  function Entry(templateSelector, borderColor, backgroundColor, entry) {
    //Get the template's inner HTML, then create an element from it
    //The syntax here is very picky. Other methods of creating elements
    //from templates can result in "Document Fragments" which cannot hide or fade in
    var elementDiv = $($(templateSelector).html());

    var image = $(elementDiv).find('.pi-card-image');

    if (image.length === 0) {
      throw new Error('Could not find image element');
    }

    image.attr('src', entry.photoUrl);

    //Get the title label within the element
    var nameContent = $(elementDiv).find('.pi-card-name-content');

    //Ensure the title label element exists
    if (nameContent.length === 0) {
      throw new Error('Could not find name-content element');
    }

    //Add the text into the title label element
    nameContent.append(entry.name);

    if (entry != EMPTY_ENTRY) {
      let statusContent = $(elementDiv).find('.pi-card-status-content');

      if (statusContent.length === 0) {
        throw new Error('could not find status-content element');
      }
      if (entry.late) {
        statusContent.append("Late");
        statusContent.css({
          "font-style": "italic"
        });
      } else {
        statusContent.append("On Duty");
      }
    }

    elementDiv.css({
      "border-color": borderColor,
      "background-color": backgroundColor
    });

    //Set this $element property to the newly created element
    //$element will be accessed by the caller
    this.$element = elementDiv;
  };

  App.OnDuty = OnDuty;
  window.App = App;

}) (window);
