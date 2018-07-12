function prepareAndAnimateTickers() {
  $('.news-ticker').each(function() {
    var news_ticker = this;
    var message = "";
    $('.news-ticker li span').each(function() {
      message += this.innerText + " ⦁ ";
    });
    $('.news-ticker ul').each(function() {
      news_ticker.removeChild(this);
    });
    var table = document.createElement("table");
    $(table).css({ 'width': '100%', 'height': '100%' });
    news_ticker.appendChild(table);
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var td = document.createElement("td");
    table.appendChild(td);

    var span = document.createElement("span");
    span.className = "ticker-span";
    span.innerText = message + message;
    td.appendChild(span);

    var textWidth = span.clientWidth / 2;
    var time = (textWidth / 125) * 1000;
    animate(span, textWidth, time);
  });
}

function animate(element, distance, time) {
  $(element).css({ 'right': '0' });
  $(element).animate({ 'right': distance + 'px' },
    time, 'linear', function() {
      animate(element, distance, time);
    });
}
