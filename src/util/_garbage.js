// Note: not used pieces of code which didnt want to delete, maybe they will be needed in some impobable future

// Used this to identify if dragged over object is on top or botton half
const onDragOver = (e, item) => {
  const rect = this.ref.current.getBoundingClientRect();
  const height = rect.height;
  const y = e.clientY - rect.top;
  const dragOverTop = y < height / 2;
  this.setState(() => ({ dragOverTop }));
};
