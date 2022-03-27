export const generateRange = (start, end) => {
  const range = [];
  for (let i = start; i <= Math.abs(end - start) + 1; i += 1) {
    range.push(i);
  }
  return range;
};
