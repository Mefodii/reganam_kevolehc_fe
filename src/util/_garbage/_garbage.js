// Note: not used pieces of code which didnt want to delete, maybe they will be needed in some impobable future

// Used this to identify if dragged over object is on top or botton half
const onDragOver = (e, item) => {
  const rect = this.ref.current.getBoundingClientRect();
  const height = rect.height;
  const y = e.clientY - rect.top;
  const dragOverTop = y < height / 2;
  this.setState(() => ({ dragOverTop }));
};

// Immutable functions
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
