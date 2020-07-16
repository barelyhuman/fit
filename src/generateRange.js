export const generateRange = (start, end) => {
  const length = Math.abs(end - start);
  const array = Array.from({ length }, (_, i) => {
    return i + start;
  });
  array.push(end);
  return array;
};
