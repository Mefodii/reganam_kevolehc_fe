import { useEffect } from 'react';

// Updates the height of a <textarea> when the value changes.
export const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string,
  autoSize: boolean
) => {
  useEffect(() => {
    if (textAreaRef && autoSize) {
      // NOTE / TODO: Potential infinite loop!!!

      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + 'px';

      // vvvv - old implementation of autosize
      // textAreaRef.current.style.height = `inherit`;
      // textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [textAreaRef, value, autoSize]);
};
