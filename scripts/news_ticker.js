(function (window) {
  'use strict';

  let App = window.App || {};
  let $ = window.jQuery;

  //Sets the scroll speed of the ticker
  let TICKER_SPEED = 125; //px per second

  function NewsTicker(tickerSelector) {
    //Ensure a proper selector for the ticker element is provided
    if (!tickerSelector) {
        throw new Error('No selector provided');
    } else if (tickerSelector.charAt(0) != '#') {
      throw new Error("Selector must be element id. Use # selector.");
    }

    //Get the ticker element
    let news_ticker = $(tickerSelector)[0];

    //Build the ticker message
    var message = "";
    $(news_ticker).find('li').each(function() { //Add the contents of each li to the message
      message += this.innerText + " ⦁ ";
    });
    $(news_ticker).find('ul').each(function() { ///Remove the original HTML list
      news_ticker.removeChild(this);
    });

    //Create a table - a table is used to center the message text vertically
    let table = document.createElement("table");
    $(table).css({ 'width': '100%', 'height': '100%' });
    news_ticker.appendChild(table);

    //Create a single row/column cell entry
    let tr = document.createElement("tr");
    table.appendChild(tr);
    let td = document.createElement("td");
    table.appendChild(td);

    //Fill the table cell with the constructed message
    let span = document.createElement("span");
    span.className = "ticker-span"; //This class is used in news_ticker.css for styling
    span.innerText = message + message; //Double the message up to allow for
                                        //continuous scrolling without gaps
    td.appendChild(span);

    //Ensure the message is long enough to have continuous scrolling without gaps
    if (span.clientWidth / 2 < news_ticker.clientWidth) {
      throw new Error("Text must be at least as wide as the container");
    }

    //Calculate the width of the message
    //Divide by two to get the width of one copy of the message, since it is doubled up
    let textWidth = span.clientWidth / 2;

    //Calculate the scroll time for one copy of the message
    let time = (textWidth / TICKER_SPEED) * 1000;

    //Start the animation
    animate.call(this, span, textWidth, time);
  };

  function animate(element, distance, time) {
    //Set the left edge of the text flush with the left edge of the container
    $(element).css({ 'left': '0' });

    //Scroll the element to the left by half of it's width
    //(i.e. the width of one copy of the message)
    //When the element reaches the end of the animation,
    //the second copy of the message will be flush with the left edge of the container,
    //which will appear exactly the same as the beginning of the animation
    //At this point, recursively call animate() to reset the animation and continue scrolling
    $(element).animate({ 'left': -distance + 'px' },
      time, 'linear', function() {
        animate(element, distance, time);
      });
  };

  App.NewsTicker = NewsTicker;
  window.App = App;

}) (window);
