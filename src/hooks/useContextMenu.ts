import { useState, useEffect, useCallback } from 'react';
const useContextMenu = () => {
  const [showContext, setShowContext] = useState(false);
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleClick = () => setShowContext(false);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      setShowContext(true);
      setCoords({
        x: e.pageX,
        y: e.pageY,
      });
    },
    []
  );

  return {
    showContext,
    setShowContext,
    coords,
    setCoords,
    onContextMenu: handleContextMenu,
  };
};
export default useContextMenu;
