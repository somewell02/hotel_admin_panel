export const sliceWithEllipsis = (text, size) => {
  let t = text.trim();
  if (t.length <= size) return t;

  t = text.slice(0, size);

  //   let lastSpace = text.lastIndexOf(" ");
  //   if (lastSpace > 0) {
  //     t = text.substr(0, lastSpace);
  //   }

  return t + "...";
};
