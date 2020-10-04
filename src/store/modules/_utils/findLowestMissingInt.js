export const findLowestMissing = (collection, key, n = 1) => {
  const numbers = new Set(collection.map((obj) => obj[key]));
  for (; ; n++) if (!numbers.has(n)) return n;
};
