export const parseOptions = (options) => {
  return options.map((option, i) => {
    return { key: i, value: option };
  });
};
