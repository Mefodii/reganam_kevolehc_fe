export const replace = (array, obj, position) => [
  ...array.slice(0, position),
  obj,
  ...array.slice(position + 1),
];

export const add = (array, item) => [...array, item];

export const update = (array, updatedItem) =>
  array.map((item) => {
    if (item.id !== updatedItem.id) return item;

    return updatedItem;
  });

export const partialUpdate = (array, itemId, key, fn) =>
  array.map((item) => {
    if (item.id !== itemId) return item;

    return {
      ...item,
      [key]: fn(item),
    };
  });

export const del = (array, itemId) => array.filter(({ id }) => id !== itemId);
