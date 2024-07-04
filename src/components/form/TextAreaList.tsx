import React from 'react';
import { Button } from '../buttons';
import { SVGPlus, SVGMinus } from '../svg';
import TextArea from './TextArea';

export type TextAreaListProps = {
  name: string;
  items: string[];
  itemLabel: (item: string, index: number) => string;
  addItem?: (items: string[]) => string[];
  removeItem?: (items: string[]) => string[];
  className?: string;
  itemClassName?: string;
  copy?: boolean;
  paste?: boolean;
  onChange: (e: Form.ChangeEvent, payload: Form.Payload<string[]>) => void;
};

const TextAreaList: React.FC<TextAreaListProps> = ({
  name,
  items,
  itemLabel,
  addItem = (items) => [...items, ''],
  removeItem = (items) => {
    if (items.length <= 1) return items;
    return [...items.slice(0, -1)];
  },
  className,
  itemClassName = 'form-row',
  copy,
  paste,
  onChange,
}) => {
  const handleItemChange =
    (item: string, i: number) =>
    (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLDivElement, MouseEvent>,
      payload: Form.Payload<string>
    ) => {
      const newItems = [...items];
      newItems[i] = payload.value!;
      onChange(e, { name, value: newItems });
    };

  const handleAddItem = () => {
    const newItems = addItem(items);
    onChange(undefined, { name, value: newItems });
  };

  const handleRemoveItem = () => {
    const newItems = removeItem(items);
    onChange(undefined, { name, value: newItems });
  };

  if (items.length === 0) return <></>;

  return (
    <div className={`${className}`}>
      {items.map((item, i) => {
        const itemField = (
          <TextArea
            label={itemLabel(item, i)}
            name={`${name} - ${i + 1}`}
            key={i}
            value={item}
            onChange={handleItemChange(item, i)}
            copy={copy}
            paste={paste}
            error={''} // TODO: (L) - handle error in all form components (probable in payload)
          />
        );

        if (i > 0)
          return (
            <div className={`${itemClassName}`} key={i}>
              {itemField}
            </div>
          );

        return (
          <div className={`${itemClassName} space-x-2 flex-row`} key={i}>
            {itemField}
            <div className='w-10 h-full flex flex-col space-y-1 items-center'>
              <Button tooltip='Add Alias' onClick={handleAddItem}>
                <SVGPlus className='w-3 transition-all duration-300' />
              </Button>
              <Button tooltip='Remove Alias' onClick={handleRemoveItem}>
                <SVGMinus className='w-3 transition-all duration-300' />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(TextAreaList) as typeof TextAreaList;
