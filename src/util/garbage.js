// Used this to identify if dragged over object is on top or botton half
onDragOver = (e, item) => {
  const rect = this.ref.current.getBoundingClientRect();
  const height = rect.height;
  const y = e.clientY - rect.top;
  const dragOverTop = y < height / 2;
  this.setState(() => ({ dragOverTop }));
};
