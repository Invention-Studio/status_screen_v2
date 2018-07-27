(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function Queue(queueSelector, elementTemplateSelector) {
    if (!queueSelector) {
        throw new Error('No selector provided');
    } else if (queueSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    this.$queue = $(queueSelector);
    if (this.$queue.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }

    if (!elementTemplateSelector) {
        throw new Error('No selector provided');
    } else if (elementTemplateSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    if ($(elementTemplateSelector).length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
    this.$elementTemplateSelector = elementTemplateSelector;
  };


  Queue.prototype.updateQueue = function(queue) {
    this.$queue.find('.queue-entry').remove();

    if (queue.length > 0) {
      queue.sort(function (a, b) {
        return a.position - b.position;
      });
      queue.forEach(function(entry) {
        var $newEntry = new Entry(this.$elementTemplateSelector, entry).$element;
        this.$queue.append($newEntry);
      }.bind(this));
    } else {
      var $div = $('<div></div>', {
        'class': 'queue-entry'
      });
      $div.append("No Queue");
      this.$queue.append($div);
    }
  };

  function Entry(templateSelector, queueEntry) {
    //Get a copy of the template
    var elementDiv = $(templateSelector)[0].content.cloneNode(true);
    var titleContent = $(elementDiv).find('.queue-entry-title-content');

    var description = queueEntry.position + ". " + queueEntry.userName;
    titleContent.append(description);

    this.$element = elementDiv;
  };

  App.Queue = Queue;
  window.App = App;

}) (window);
