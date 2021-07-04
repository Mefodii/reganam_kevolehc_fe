export const replace = (array, obj, position) => [
  ...array.slice(0, position),
  obj,
  ...array.slice(position + 1),
];
