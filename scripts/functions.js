function onDutyArraysMatch(a, b) {
  //Check the value and the type
  if (a === b) {
    return true;
  }

  //Check the lengths
  if (a.length !== b.length) {
    return false;
  }

  return (JSON.stringify(a) !== JSON.stringify(b));
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
};
