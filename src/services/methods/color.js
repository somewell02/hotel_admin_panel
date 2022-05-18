export const rgb2hsl = (HTMLcolor) => {
  if (!HTMLcolor) return null;
  let r = parseInt(HTMLcolor.substring(0, 2), 16) / 255;
  let g = parseInt(HTMLcolor.substring(2, 4), 16) / 255;
  let b = parseInt(HTMLcolor.substring(4, 6), 16) / 255;
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h, s: s, l: l }; // H - цветовой тон, S - насыщенность, L - светлота
};

export const isDark = (HTMLcolor) => {
  if (!HTMLcolor) return false;
  let e = rgb2hsl(HTMLcolor);
  if ((e.h < 0.55 && e.l >= 0.5) || (e.h >= 0.55 && e.l >= 0.75)) {
    return false;
  } else {
    return true;
  }
};
