export const hasChanged = (o1, o2) => {
  if (o1.length !== o2.length) return true;
  for (let i = 0; i < o1.length; i++) {
    if (o1[i] !== o2[i]) return true;
  }

  return false;
};
