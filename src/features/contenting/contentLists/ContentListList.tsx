import React from 'react';
import { selectCategory } from '../filters/filtersSlice';
import { useAppSelector } from '../../../hooks';
import { contentFilter as filterModel } from '../../../models';
import ContentListTable from './ContentListTable';

type ContentListListProps = {
  contentLists: Model.ContentListPureDM[];
};

const ContentListList: React.FC<ContentListListProps> = ({ contentLists }) => {
  const category = useAppSelector(selectCategory);

  const filteredContentLists = filterModel.filterByCategory(
    contentLists,
    category
  );

  if (filteredContentLists.length === 0)
    return (
      <h2 className='w-full text-center text-xl uppercase font-bold m-4'>
        No List for current category
      </h2>
    );

  const renderH3 = (text: string, value?: string) => {
    if (!value) return;

    return (
      <h3 className='uppercase font-bold mb-4'>
        {text}: <span className='text-active-1 ml-2 text-sm'>{value}</span>
      </h3>
    );
  };

  return (
    <div className='flex w-full'>
      <div className='w-full flex flex-col items-center'>
        <h2 className='text-xl uppercase font-bold m-4'>Content Lists</h2>
        {renderH3('Category', category)}

        <div className='flex flex-col rounded-xl shadow-md w-10/12 space-y-10 mb-28'>
          <ContentListTable contentLists={filteredContentLists} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContentListList) as typeof ContentListList;
